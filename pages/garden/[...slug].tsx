import React, { FunctionComponent } from 'react';
import path from 'path'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import 'highlight.js/styles/monokai.css';
import {obsidianNextConnection, File} from '../../obsidian-next-connection'

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
      <div dangerouslySetInnerHTML={{ __html: fileContentAsHtml || '' }} ></div>
    </Layout>
  )
}

const getObsidian = () => obsidianNextConnection({
  vaultPath: path.join(process.cwd(), 'obsidianVault'),
  assetPath: path.join(process.cwd(), 'public/assets/'),
  urlPagesPrefix: 'garden'
})

export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  if(!params?.slug){
    throw new Error('Can not find a slug for a page')
  }
  const onc = getObsidian()
  await onc.prepareMediaFiles()
  
  const curremtFile = await onc.getFileBySlug(params.slug )
  
  if(!curremtFile){
    throw new Error('Could not found a file for a configured slug')
  }

  return { props: { 
    files: await onc.getFilesFlat(),
    file: curremtFile , 
    fileContentAsHtml: await onc.getFileContentAsHtml(curremtFile)
  } }
}

export async function getStaticPaths() {
  const onc = getObsidian()
  return {
    paths: await onc.getNextPaths(),
    fallback: false
  }
}

export default Garden