import * as fs from 'fs/promises';
import * as path from 'path';
import {Directory, File, NodeType, Nodes} from './types'

export type Options = {
    filesExtensionToAccept?: string[],
    parentFolders?: string[]
}

export const getObsidianFilesFlat = async (rootPath: string, options?: Options): Promise<Nodes> => {
    const filesTree = await getObsidianFilesTree(rootPath, options);
    return flatFilesList(filesTree);
}

export const getObsidianFilesTree = async (rootPath: string, options?: Options): Promise<Nodes> => {
    const nodeNamesInFolder = await fs.readdir(rootPath);

    return (await Promise.all(nodeNamesInFolder.map(async nodeName => {
        const nodePath = path.join(rootPath, nodeName)
        const fileInfo = await fs.lstat(nodePath)
        if (fileInfo.isFile()) {
            const isNotAcceptedExtension = options?.filesExtensionToAccept?.length && !options.filesExtensionToAccept.includes(path.extname(nodeName))
            if (isNotAcceptedExtension) {
                return null
            }
            return { 
                type: NodeType.File, 
                name: nodeName, 
                path: rootPath,
                parentFolders: options?.parentFolders || []
            } as File
        } else if (fileInfo.isDirectory()) {
            const childrens = (await getObsidianFilesTree(nodePath, {...options, parentFolders: [...(options?.parentFolders || []), nodeName ]}) || [])
            if(!childrens.length){
                return null
            }
            return { 
                type: NodeType.Directory, 
                name: nodeName, 
                path: rootPath,
                childrens,
                parentFolders: options?.parentFolders || []
             } as Directory
        } else {
            throw new Error('Not a file, not a directory - what do you scan? :)')
        }
    }))).filter(e => !!e) as Nodes
}

export const flatFilesList = (rootNode: Nodes): File[] => {
    const files: File[] = [];
    rootNode.forEach(node => {
        if (node.type === NodeType.File) {
            files.push(node)
        } else {
            files.push(...flatFilesList(node.childrens))
        }
    })
    return files
}