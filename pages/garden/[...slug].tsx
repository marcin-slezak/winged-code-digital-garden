import React, {FunctionComponent} from 'react';
import path from 'path'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import {getObsidianFilesFlat, getFileContent} from '../../utils/obsidian/files'
import {File} from '../../utils/obsidian/types'
import {getUrlToFile} from '../../utils/obsidian/url'

export type GardenProps = {
  files: File[],
  file: File,
  fileContent?:string
}

const Garden: FunctionComponent<GardenProps> = ({files, file, fileContent}) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout>
      <h1>{file.name}</h1>
      {fileContent}
    </Layout>
  )
}


export async function getStaticProps({params}: {params: {slug?: string[]}} ) {
  console.log({params})
  const obsidianDirectory = path.join(process.cwd(), 'obsidianVault')
  const filesFlat = await getObsidianFilesFlat(obsidianDirectory, {filesExtensionToAccept: ['.md']})
  const file = filesFlat.find(f => {
    if(!params?.slug){
      return false
    }
    const fileUrl = getUrlToFile(f)
    const requestedUrl = `/${params?.slug.join('/')}`
    return fileUrl === requestedUrl
  })
  const fileContent = file? await getFileContent(file) : ''
  return {props: {files: filesFlat, fileContent, file: file}}
}

export async function getStaticPaths() {
  const obsidianDirectory = path.join(process.cwd(), 'obsidianVault')
  const filesFlat = await getObsidianFilesFlat(obsidianDirectory, {filesExtensionToAccept: ['.md']})
  const paths = filesFlat.map(file => ({params: {slug: getUrlToFile(file).split('/').filter(e => e) }}))
  return {
    paths,
    fallback: false
  }
}

export default Garden