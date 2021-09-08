import React, { FunctionComponent } from 'react';
import path from 'path'
import Link from 'next/link'
import { Layout } from '../../components/layout'
import {obsidianNextConnection, File, } from '../../obsidian-next-connection'
import {getUrlToFile} from '../../obsidian-next-connection/url'

export type GardenProps = {
  files: File[]
}

const Garden: FunctionComponent<GardenProps> = ({ files }) => {

  return (
    <Layout>
      <h1>Digital garden</h1>
      <p>Enjoy my collection ...</p>
      <ul>
        {files.map(file => <li key={file.path}> <Link href={getUrlToFile(file, 'garden')}>{file.name}</Link> </li>)}
      </ul>
    </Layout>
  )
}

export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  const onc = obsidianNextConnection({
    vaultPath: path.join(process.cwd(), 'obsidianVault'),
    assetPath: path.join(process.cwd(), 'public/assets/'),
    urlPagesPrefix: 'garden'
  })
  return { props: { files: await onc.getFilesFlat() } }
}

export default Garden