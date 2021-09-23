## Winged Code Digital Garden

It's new version of [wingedcode.com](wingedcode.com) website in a form of digital garden. *Digital Garden* is `an online space at the intersection of a notebook and a blog`. The goal is to share knwoledge managed by [https://obsidian.md/](Obsidian) application that save a content in markdown files.

## Featres / Constrains

- use Static Site Generator and host on dummy server
- automate deploy to dummy server via sftp
- be able to build pages using react + custom css and generate pages from Obsidian markdown files 
- manage to display a snippets of code in some nice way
- make page super fast (including aprsing markdown to html on build time)

## Technical side

This project is using [Next.js](https://nextjs.org/) framework including TypeScript and React. To learn more about Next.js, take a look at the following resources:


- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Configuration

I'm using enviroment variables. For development purposes you can create `.env` file with following content:

```
NEXT_PUBLIC_GA_TRACING_CODE=XXXXXXX
NEXT_PUBLIC_DOMAIN=https://wingedcode.com
```

where: 
- NEXT_PUBLIC_GA_TRACING_CODE - Google Analitics tracking code (optional)
- NEXT_PUBLIC_DOMAIN - domain that will be used to generate sitemap.xml (optional)

## How to run application

Dependencies: nodejs, npm and git.

To run development enviroment
1. Download repository
2. install dependencies `npm install`
3. run server `npm run dev`
4. open in browser [http://localhost:3000](http://localhost:3000) to see webiste

