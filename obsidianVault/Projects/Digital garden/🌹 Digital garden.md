## Why

I have a great memory, but short 😁 It Looks like my brain efficiently prepare space for new challenges by kicking out of my head everything that is not needed anymore. After so many years, I caught myself that I do not remember some important concepts for me in the past. For example, differences between InnoDB and MyISAM - 7 years ago, this knowledge helped me keep the project alive. Now I only remember a tradeoff between performance and data consistency but do not ask me about details. 

To be a good developer, we need to learn from our mistakes and find a way to collect our experience more efficiently than only in our heads. Last year, I tested many ways to write down everything that could help me with software development. We need an easy way to keep notes from a current project, a summary from meetings, code snippets, links to valuable articles, ready solutions for everyday challenges, good practices, a list of useful tools, processes, procedures, checklists etc. 

As for each form of documentation, the biggest challenge is not to create content but to keep everything up to date, organized, and easy to find when needed. Because of that, I saw it convenient to use Notion, which allows me to move quickly between linked and organized documents.

I also noticed that some content that I create could be helpful for other developers too. And from that point is not too far to the idea for [*Winged Code Digital Garden*](https://wingedcode.com/) page. 

>Digital garden is an online space at the intersection of a notebook and a blog

Notion allows public pages and recently released the [Notion API](https://developers.notion.com/), but still, I wanted to challenge myself to build something on my own, from scratch, something on which I will have complete control.

Then, someone gave me a hint to try Obsidian that maybe it's not so powerful as Notion but has some benefits:
1. It's free to use (mostly)
2. Obsidian saves content locally on hard what makes the application fast
3. It uses markdown syntax to create and store files what for me, as a developer, is awesome
4. I have my own NAS storage for backups and files sync between devices, so content on a hard drive is not a big deal - especially that as a developer, I know how quickly to use a public git server to make a content copy.

At that point, I knew that I could create a website that would pull content from Obsidian.

Obsidian application 👇
![[Pasted image 20210924220839.png]]

Home page 👇
![[Pasted image 20210925202258.png]]

Contact page 👇
![[Pasted image 20210925202408.png]]

List of pages (digital garden) on website 👇
![[Pasted image 20210925003401.png]]

Page that contains content from obsidian👇
![[Pasted image 20210925003418.png]]

## How

This project is using [Next.js](https://nextjs.org/) framework, including React and TypeScript. The reason why I chose Next.js are described here: [[📱 Why use Next.js?]]

I built the website as a static site generator. What does it mean? During a build, the script takes all definitions, content, templates, process them, and outputs them to a folder as a bunch of static files (HTML, CSS, js) that can be loaded directly by the browser through a server that serves static content. Because server-side serve static content generated during build, it's speedy, secure and has low server requirements.

Pages are build with content that comes from two sources:
1. Pages built as custom react components like `Home Page` or `Contant page`. Those pages can be customized as much as we want. 
2. Pages built by parsing markdown files from Obsidian vault. I really wanted to keep this website fast. Generating HTML from Markdown can be really CPU expensive (not mention about library/additional js files that need to be loaded by a browser) what can easly affect page performace badly. Because of that, translation from Markdown to HTML is performed during build time (via [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)). Here is a example page that shows all available components [[☘️ Test markdown to html]]

Page code and Obsidian content are available in https://github.com/marcin-slezak/winged-code-digital-garden GitHub repository. Most of the logic responsible for connecting Next.js application with Obsidian vault is in [obsidian-next-cnnection](https://github.com/marcin-slezak/winged-code-digital-garden/tree/main/obsidian-next-connection) folder, and I believe that can be easily adopted by anyone who wants's to do a similar project.


## Configuration

Application is using enviroment variables. For development purposes you can create `.env` file with following content:

  

```
NEXT_PUBLIC_GA_TRACING_CODE=XXXXXXX
NEXT_PUBLIC_DOMAIN=https://wingedcode.com
FTP_HOST=xxx
FTP_USER=xxx
FTP_PASSWORD=xxx
```

  
where:
- NEXT_PUBLIC_GA_TRACING_CODE - Google Analitics tracking code (optional)
- NEXT_PUBLIC_DOMAIN - domain that will be used to generate sitemap.xml (optional)
- FTP_HOST - ftps server address, used to deploy generated website to dump server via ftp (optional)
- FTP_USER - ftp user (optional)
- FTP_PASSWORD - ftp password (optional)


## How to run application

Dependencies: nodejs, npm and git.
To run development enviroment

1. Download repository

2. install dependencies: `npm install`

3. run server: `npm run dev`

4. open in browser [http://localhost:3000](http://localhost:3000) to see webiste


## How to go live

```bash
npm run build
npm run export
npm run deploy
```

`npm run deploy` is a custom script that export a website to the web server via ftp so you need configure FTP connection first or copy files manually (from `/out` folder).