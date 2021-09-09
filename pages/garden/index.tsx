import React, { FunctionComponent } from 'react';
import path from 'path'
import Link from 'next/link'
import { Layout } from '../../components/layout'
import {obsidianNextConnection } from '../../obsidian-next-connection'
import { Nodes, NodeType, File, Directory } from '../../obsidian-next-connection/types'
import {getUrlToFile} from '../../obsidian-next-connection/url'
import styles from './index.module.css'
export type GardenProps = {
  nodes: Nodes
}

const sortList = (a: File | Directory, b: File | Directory) => {
  if(a.type === NodeType.Directory && b.type === NodeType.File){
    return -1
  }else if(b.type === NodeType.Directory && a.type === NodeType.File) {
    return 1
  }
  return a.name.localeCompare(b.name)
}

const renderNodes = (nodes: Nodes, level:number) => (<ol className={`${styles.ol} ${styles[`ol${level}`]}`}>
  {nodes.sort(sortList).map(node => <li key={`${node.path}/${node.fullName}`} className={styles.li}>
    {node.type === NodeType.File? <Link href={getUrlToFile(node, 'garden')}><a className={styles.a} >{node.name}</a></Link> : <span>{node.name}</span>}
    {node.type === NodeType.Directory? renderNodes(node.childrens, level+1):null}
  </li>)}
</ol>)

const Garden: FunctionComponent<GardenProps> = ({ nodes }) => {
  return (
    <Layout>
      <h1>Digital garden</h1>
            
      {renderNodes(nodes, 0)}
      
    </Layout>
  )
}

export async function getStaticProps({ params }: { params: { slug?: string[] } }) {
  const onc = obsidianNextConnection({
    vaultPath: path.join(process.cwd(), 'obsidianVault'),
    assetPath: path.join(process.cwd(), 'public/assets/'),
    urlPagesPrefix: 'garden'
  })
  return { props: { nodes: await onc.getFilesTree() } }
}

export default Garden