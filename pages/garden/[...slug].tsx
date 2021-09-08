import React, { FunctionComponent } from 'react';
import path from 'path'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import { getObsidianFilesFlat, getFileContent, MEDIA_FILES_EXTENSIONS, PAGES_FILES_EXTENSIONS, getObsidianVaultDirecotryPath } from '../../utils/obsidian/files'
import { File } from '../../utils/obsidian/types'
import { getUrlToFile, slugToUrl, findFileByUrl } from '../../utils/obsidian/url'
import 'highlight.js/styles/monokai.css';
import {render} from '../../utils/obsidian/mdToHtml'
import {copyMediaToPublicFolder} from '../../utils/obsidian/media'

export type GardenProps = {
  files: File[],
  file: File,
  fileContentAsHtml?: string
}

const Garden: FunctionComponent<GardenProps> = ({ files, file, fileContentAsHtml }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout>
      <h1>{file.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: fileContentAsHtml || '' }} ></div>
    </Layout>
  )
}


export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  const filesFlatMedia = await getObsidianFilesFlat({ filesExtensionToAccept: MEDIA_FILES_EXTENSIONS })
  await copyMediaToPublicFolder(filesFlatMedia)
  const filesFlat = await getObsidianFilesFlat({ filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
  const curremtFile = filesFlat.find(findFileByUrl(slugToUrl(params.slug)))
  if(!curremtFile){
    throw new Error('Could not found a file for a configured slug')
  }
  const fileContentAsHtml = render(await getFileContent(curremtFile) , filesFlat, filesFlatMedia)
  return { props: { files: filesFlat, file: curremtFile, fileContentAsHtml } }
}

export async function getStaticPaths() {
  const filesFlat = await getObsidianFilesFlat( { filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
  const paths = filesFlat.map(file => ({ params: { slug: getUrlToFile(file).split('/').filter(e => e) } }))
  return {
    paths,
    fallback: false
  }
}

export default Garden