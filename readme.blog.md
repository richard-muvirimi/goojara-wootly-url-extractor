# Simplifying Video URL Extraction from Goojara and Wootly

*April 28, 2025*

## Introduction

In the world of online streaming, navigating through multiple redirects and advertising pages can be a frustrating experience. Today, I want to introduce you to a practical tool that solves this problem specifically for [Goojara](https://goojara.ch) and [Wootly](https://go.wootly.ch) websites - the **Goojara-Wootly URL Extractor**.

This open-source project provides a simple yet powerful solution to extract direct video URLs, bypassing the maze of redirects and advertisements that typically stand between you and the content you want to access.

## What Does This Tool Do?

The Goojara-Wootly URL Extractor is a command-line utility that:

1. Navigates to a Goojara or Wootly video page
2. Automatically handles all redirect pages and ad popups
3. Extracts the direct video URL
4. Displays the movie/video title and the clean, direct link

All of this happens within seconds, saving you from endless clicks and potential malicious ads.

![Terminal Screenshot](https://raw.githubusercontent.com/richard-muvirimi/goojara-wootly-url-extractor/release/screenshots/shot-1.png)

## Getting Started

### System Requirements

Before diving in, make sure your system meets these basic requirements:
- Node.js 16.x or higher
- Google Chrome (required for Puppeteer)

### Installation

Setting up the extractor is straightforward:

1. Clone the repository:
   ```bash
   git clone https://github.com/richard-muvirimi/goojara-wootly-url-extractor
   ```

2. Navigate to the project directory and install dependencies:
   ```bash
   cd goojara-wootly-url-extractor
   npm install
   ```
   
   Alternatively, if you prefer Yarn:
   ```bash
   yarn install
   ```

## How to Use the Tool

The beauty of this project lies in its flexibility. Depending on your operating system and preferences, you have multiple ways to use it:

### Method 1: Direct Script Execution

#### For Unix-based systems (Linux, macOS):
```bash
sh ./link.sh "https://goojara.ch/movie-page-url"
```

#### For Windows:
```bash
./link.bat "https://goojara.ch/movie-page-url"
```

### Method 2: Using Node.js Directly

```bash
node index.js expose "https://goojara.ch/movie-page-url"
```

### Method 3: Docker Container

For those who prefer containerization or want to avoid installing dependencies directly:

```bash
docker run ghcr.io/richard-muvirimi/goojara-wootly-url-extractor:release expose "https://goojara.ch/movie-page-url"
```

### Method 4: Global Command Installation

You can also install the tool globally to use it as a command from anywhere:

#### For Unix-based systems:
```bash
npm run path:linux
```

#### For Windows:
```bash
npm run path:windows
```

#### For Docker users:
```bash
npm run path:docker
```

Once installed globally, usage becomes as simple as:

```bash
goojara "https://goojara.ch/movie-page-url"
```

## Expected Output

Regardless of the method you choose, you'll receive an output similar to this:

```
> Goojara Title: Movie Title (1970)
> Wootly Title: Movie.Title.1970
> LINK: https://go.wootly.ch/dash...
```

The extracted URL can then be used in your preferred video player or download manager.

## Advanced Features

### Verbose Mode

Need more details about what's happening under the hood? Use the verbose flag:

```bash
node index.js expose "video-page-url" --verbose-level debug
```

This shows you step-by-step what the tool is doing, which can be helpful for troubleshooting.

### Help Command

For a quick reminder of all available options:

```bash
node index.js --help
```

## Docker Support

The project includes comprehensive Docker support, which is particularly useful for:
- Running in environments where installing Node.js isn't feasible
- Ensuring consistent behavior across different systems
- Deploying as part of automated workflows

For detailed Docker instructions, refer to the README.Docker.md file included in the repository.

## How It Works

Under the hood, the extractor uses Puppeteer, a headless Chrome automation library, to:

1. Navigate to the provided Goojara URL
2. Extract the movie title
3. Click through to the Wootly player
4. Bypass any interstitial pages
5. Extract the direct media URL from the final player page

All of this happens programmatically, without requiring manual intervention.

## Why Use This Tool?

- **Time-saving**: No more clicking through multiple pages and dodging ads
- **Safety**: Reduce exposure to potentially malicious advertisements
- **Convenience**: Extract playable URLs that can be used in any media player
- **Flexibility**: Multiple usage options to fit your workflow
- **Open Source**: Fully transparent code that you can modify or extend

## Conclusion

The Goojara-Wootly URL Extractor represents a practical solution to a common frustration. Whether you're a casual user looking to streamline your viewing experience or a developer interested in browser automation, this tool offers valuable functionality with minimal setup.

Give it a try by visiting the [GitHub repository](https://github.com/richard-muvirimi/goojara-wootly-url-extractor), and feel free to contribute to its development if you have ideas for improvements!

## License

The project is licensed under the Apache License 2.0, making it free to use, modify, and distribute with proper attribution.

---

*Disclaimer: This tool is intended for educational purposes and personal use only. Always respect copyright laws and terms of service for the content you access.*