import markdown from 'markdown-it'
import markdownPlugin from 'markdown-it-regexp'
import hljs from 'highlight.js';
import {File} from './types'
import {getUrlToFile} from './url'

const parseObsidianLinksPlugin = (files: File[], filesFlatMedia: File[] ) => markdownPlugin(
    /!?\[\[(([^\]#\|]*)(#[^\|\]]+)*(\|[^\]]*)*)\]\]/,

    // this function will be called when something matches
    function (match: RegExpExecArray) {
      const isLinkToMedia = match.input.startsWith('!')
      const fileNameOrPath = match[1]
      const destinationFile = files.find(file => file.name ===  fileNameOrPath || `${file.parentFolders.join('/')}/${file.name}` === fileNameOrPath)
      if(destinationFile){
          return `<a href="${getUrlToFile(destinationFile, 'garden')}">${fileNameOrPath}</a>`
      }
      if(isLinkToMedia){
          const file = filesFlatMedia.find(file => file.fullName === fileNameOrPath)
          return `<img src="/assets/${file?.fullName}" />`
      }
      throw new Error(`Link not found, validate your markdown ${match.input} ` )
    }
  )

export const render = (fileContent: string, files: File[], filesFlatMedia: File[] ):string => markdown({
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + markdown().utils.escapeHtml(str) + '</code></pre>';
    }
  })
  .use(parseObsidianLinksPlugin(files, filesFlatMedia))
  .render(fileContent)