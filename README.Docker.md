# Video Url Extractor - Docker Guide

This guide explains how to build, run, and deploy the Goojara/Wootly URL Extractor using Docker.

## Prerequisites

- Docker installed on your system
- Git (to clone the repository if needed)

## Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Alternatively, you can build and run the Docker image directly:
```bash
docker build -t goojara-url-extractor .
docker run goojara-url-extractor expose "video-page-url"
```

## Using the pre-built Docker image

A pre-built Docker image is available on GitHub Container Registry. You can use it directly:

```bash
docker run ghcr.io/richard-muvirimi/goojara-wootly-url-extractor:release expose "video-page-url"
```

## Adding to your PATH

You can make the Docker version available in your PATH by running:

```bash
npm run path:docker
```

This will create a shortcut called `goojara` in your `~/.local/bin` directory that uses the Docker container.

## Deploying your application to the cloud

First, build your image:
```bash
docker build -t goojara-url-extractor .
```

If your cloud uses a different CPU architecture than your development machine (e.g., you are on a Mac M1 and your cloud provider is amd64), you'll want to build the image for that platform:
```bash
docker build --platform=linux/amd64 -t goojara-url-extractor .
```

Then, push it to your registry:
```bash
docker tag goojara-url-extractor:latest your-registry.com/goojara-url-extractor:latest
docker push your-registry.com/goojara-url-extractor:latest
```

## Image Details

The Docker image includes:
- Node.js 22
- Google Chrome (required for Puppeteer)
- All necessary dependencies

The application runs as a non-root user (`goojara`) for improved security.

## Examples

Extract a video URL:
```bash
docker run ghcr.io/richard-muvirimi/goojara-wootly-url-extractor:release expose "https://goojara.ch/xxxxxx"
```

Show help:
```bash
docker run ghcr.io/richard-muvirimi/goojara-wootly-url-extractor:release --help
```

## References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
* [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)