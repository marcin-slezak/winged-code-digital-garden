import dayjs from 'dayjs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getUrlToFile } from './obsidian-next-connection/url'
import { File } from './obsidian-next-connection'

export const getSitemapContent = (dynamicPages: string[]) => {

    const now = dayjs().format('YYYY-MM-DD')

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://wingedcode.com</loc>
        <lastmod>${now}</lastmod>
    </url>
    <url>
        <loc>https://wingedcode.com/contact</loc>
        <lastmod>${now}</lastmod>
    </url>
    <url>
        <loc>https://wingedcode.com/garden</loc>
        <lastmod>${now}</lastmod>
    </url>
    <url>
        <loc>https://wingedcode.com/garden</loc>
        <lastmod>${now}</lastmod>
    </url>
    ${dynamicPages.map(page => `
    <url>
        <loc>${page}</loc>
        <lastmod>${now}</lastmod>
    </url>`).join('')}
    </urlset>`
    return sitemapContent
}

export const prepareSitemapFile = async (domain: string, publicPath: string, files: File[]) => 
    fs.writeFile(path.join(publicPath, 'sitemap.xml'), getSitemapContent(files.map(f => `${domain}${getUrlToFile(f)}`)))

