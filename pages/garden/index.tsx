import React, { FunctionComponent } from 'react';
import path from 'path'
import Link from 'next/link'
import { Layout } from '../../components/layout'
import {getObsidianFilesFlat} from '../../utils/obsidian/files'
import {File} from '../../utils/obsidian/types'
import {getUrlToFile} from '../../utils/obsidian/url'

export type GardenProps = {
  files: File[]
}

const Garden: FunctionComponent<GardenProps> = ({ files }) => {

  return (
    <Layout>
      <h1>Digital garden</h1>
      <p>Enjoy my collection ...</p>
      <ul>
        {files.map(file => <li key={file.path}> <Link href={getUrlToFile(file)}>{file.name}</Link> </li>)}
      </ul>
    </Layout>
  )
}


export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  console.log({ params })
  const obsidianDirectory = path.join(process.cwd(), 'obsidianVault')
  const filesFlat = await getObsidianFilesFlat(obsidianDirectory, { filesExtensionToAccept: ['.md'] })

  return { props: { files: filesFlat } }
}



export default Garden