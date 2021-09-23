import React, { FunctionComponent } from 'react';
import path from 'path'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layout'
import Link from 'next/link'
import 'highlight.js/styles/monokai.css';
import { obsidianNextConnection, File } from '../../obsidian-next-connection'
import styles from './index.module.css';
export type GardenProps = {
  files: File[],
  file: File,
  fileContentAsHtml?: string,
  meta: any
}

const Garden: FunctionComponent<GardenProps> = ({ meta, files, file, fileContentAsHtml }) => {
  const router = useRouter()
  const breadcrumbs: { url: string | null, label: string }[] = [
    { url: '/garden', label: 'Digital garden' },
    ...file.parentFolders.map(pf => ({ url: null, label: pf }))
  ]
  const { slug } = router.query
  return (
    <Layout>
      <ol className={styles.breadcrumb}>
        {breadcrumbs.map(bc => <li key={bc.label}>{bc.url? <Link href={bc.url}>{bc.label}</Link>: bc.label }</li>)}
      </ol>
      <h1>{file.name}</h1>
      <div className={styles.markdownContainer} dangerouslySetInnerHTML={{ __html: fileContentAsHtml || '' }} ></div>
    </Layout>
  )
}

const getObsidian = () => obsidianNextConnection({
  vaultPath: path.join(process.cwd(), 'obsidianVault'),
  assetPath: path.join(process.cwd(), 'public/assets/'),
  urlPagesPrefix: 'garden'
})

export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  if (!params?.slug) {
    throw new Error('Can not find a slug for a page')
  }
  const onc = getObsidian()
  await onc.prepareMediaFiles()
  
  const curremtFile = await onc.getFileBySlug(params.slug)

  if (!curremtFile) {
    throw new Error('Could not found a file for a configured slug')
  }

  const {document, meta} = await onc.getFileContentAsHtml(curremtFile)

  return {
    props: {
      meta,
      files: await onc.getFilesFlat(),
      file: curremtFile,
      fileContentAsHtml: document,
    }
  }
}

export async function getStaticPaths() {
  const onc = getObsidian()
  return {
    paths: await onc.getNextPaths(),
    fallback: false
  }
}

export default Garden