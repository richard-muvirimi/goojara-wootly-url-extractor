const {program, Option} = require('commander');
const puppeteer = require('puppeteer');
const Duration = require('luxon').Duration;
const path = require('node:path');
const log4js = require("log4js");

program
    .name('expose')
    .description('CLI to expose download links from Goojara and Wootly')
    .version('1.0.0');

program.command('expose')
    .description('Expose download links from Goojara and Wootly')
    .argument('<target>', 'The site link to expose download link from')
    .addOption(
        new Option('-v, --verbose-level <verbosity>', 'Print verbose logs')
            .default("info")
            .choices(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'])
    )
    .action(async (target, options) => {

        log4js.configure({
            appenders: {
                console: {
                    type: "console",
                },
            },
            categories: {
                default: {appenders: ["console"], level: options.verboseLevel || "info"}
            },
        });

        const logger = log4js.getLogger("expose");

        // Start extraction
        let downloadUrl = "";

        const browser = await puppeteer.launch({headless: "new"});

        try {

            const page = await browser.newPage();

            await page.goto(target, {timeout: Duration.fromObject({minutes: 5}).toMillis()});

            logger.debug("Navigated to: " + target)

            const ur = new URL(target)

            if (ur.origin.includes("goojara")) {

                logger.trace("Goojara detected, taking appropriate measures.")

                const title1 = await page.title()

                logger.info("Goojara Title: " + title1.replace(/watch\s*/i, ""))

                await page.click("#drl a:first-of-type")

                logger.trace("Navigated to wootly")

            }

            logger.debug("waiting for play button")

            let handle = await page.waitForSelector("#container iframe", {timeout: Duration.fromObject({minutes: 5}).toMillis()});

            const iframe = await handle.contentFrame()

            const btn = await iframe.waitForSelector(".vid-holder .playh", {timeout: Duration.fromObject({minutes: 5}).toMillis()});

            await btn.click(".vid-holder .playh");

            logger.debug("play clicked")

            await iframe.waitForNavigation({timeout: Duration.fromObject({minutes: 10}).toMillis()});

            logger.debug("Navigated to video")

            const title2 = await page.title()

            logger.info("Wootly Title: " + path.basename(title2, path.extname(title2)))

            await iframe.waitForSelector("#dld a[href^='https://go.wootly.ch/dash']", {timeout: Duration.fromObject({minutes: 10}).toMillis()});

            logger.debug("waiting for download button")

            downloadUrl = await iframe.evaluate("document.querySelector(\"#dld a[href^='https://go.wootly.ch/dash']\").href")

        } catch (e) {
            logger.error(e)
        } finally {
            await browser.close();
        }

        if (options.linkOnly) {
            console.clear()
        }

        logger.mark("Link: " + downloadUrl);
    });

program.parse();