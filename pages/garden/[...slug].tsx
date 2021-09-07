import React, {FunctionComponent} from 'react';
import path from 'path'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import {getObsidianFilesFlat} from '../../utils/obsidian/files'
import {File} from '../../utils/obsidian/types'
import {getUrlToFile} from '../../utils/obsidian/url'

export type GardenProps = {
  files: File[]
}

const Garden: FunctionComponent<GardenProps> = ({files}) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout>
      <h1>Garden page</h1>
      {JSON.stringify(slug)}
      {JSON.stringify(files)}
    </Layout>
  )
}


export async function getStaticProps({params}: {params: {slug?: string[]}} ) {
  console.log({params})
  const obsidianDirectory = path.join(process.cwd(), 'obsidianVault')
  const filesFlat = await getObsidianFilesFlat(obsidianDirectory, {filesExtensionToAccept: ['.md']})
  return {props: {files: filesFlat}}
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ['a'] } },
      { params: { slug: ['bb'] } },
      { params: { slug: ['ccc', 'ddd'] } },
    ],
    fallback: false
  }
}

export default Garden