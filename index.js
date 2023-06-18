const puppeteer = require('puppeteer');
const Duration = require('luxon').Duration;
require('dotenv').config();

setImmediate(async () => {

    const [, , target] = process.argv;

    let downloadUrl = "";

    const browser = await puppeteer.launch({headless: "new"});

    try {

        const page = await browser.newPage();

        await page.goto(target, {timeout: Duration.fromObject({minutes: 5}).toMillis()});

        console.log("Navigated to: " + target)

        const ur = new URL(target)

        if (ur.origin.includes("goojara")) {

            console.log("Goojara detected, taking appropriate measures.")

            await page.click("#drl a:first-of-type")

            console.log("Navigated to wootly")

        }

        console.log("waiting for play button")

        let handle = await page.waitForSelector("#container iframe", {timeout: Duration.fromObject({minutes: 5}).toMillis()});

        const iframe = await handle.contentFrame()

        const btn = await iframe.waitForSelector(".vid-holder .playh", {timeout: Duration.fromObject({minutes: 5}).toMillis()});

        await btn.click(".vid-holder .playh");

        console.log("play clicked")

        await iframe.waitForNavigation({timeout: Duration.fromObject({minutes: 10}).toMillis()});

        console.log("Navigated to video")

        await iframe.waitForSelector("#dld a[href^='https://go.wootly.ch/dash']", {timeout: Duration.fromObject({minutes: 10}).toMillis()});

        console.log("waiting for download button")

        downloadUrl = await iframe.evaluate("document.querySelector(\"#dld a[href^='https://go.wootly.ch/dash']\").href")

    } catch (e) {
        console.error(e)
    } finally {
        await browser.close();
    }

    console.log(downloadUrl);

});