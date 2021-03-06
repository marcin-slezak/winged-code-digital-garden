import * as fs from 'fs/promises';
import * as path from 'path';
import { Directory, File, NodeType, Nodes } from './types'

export const PAGES_FILES_EXTENSIONS = ['.md']
export const MEDIA_FILES_EXTENSIONS = ['.png', '.svg']



export type Options = {
    filesExtensionToAccept?: string[],
    parentFolders?: string[],
    ignoreFolders?: string[]
}

export const getObsidianFilesFlat = async (rootPath: string, options?: Options): Promise<File[]> => {
    const filesTree = await getObsidianFilesTree(rootPath, options);
    return flatFilesList(filesTree);
}

export const getObsidianFilesTree = async (rootPath: string, options?: Options): Promise<Nodes> => {
    const nodeNamesInFolder = await fs.readdir(rootPath);
    const files = await Promise.all(nodeNamesInFolder.map(async nodeName => {
        const nodePath = path.join(rootPath, nodeName)
        if(Array.isArray(options?.ignoreFolders) &&  options?.ignoreFolders.includes((options?.parentFolders || []).join('/')) ){
            return null
        }
        
        const fileInfo = await fs.lstat(nodePath)
        if (fileInfo.isFile()) {
            const isNotAcceptedExtension = options?.filesExtensionToAccept?.length && !options.filesExtensionToAccept.includes(path.extname(nodeName))
            if (isNotAcceptedExtension) {
                return null
            }
            return {
                type: NodeType.File,
                name: path.parse(nodeName).name,
                fullName: nodeName,
                path: rootPath,
                parentFolders: options?.parentFolders || []
            } as File
        } else if (fileInfo.isDirectory()) {
            const childrens = (await getObsidianFilesTree(nodePath, {
                ...options,
                parentFolders: [...(options?.parentFolders || []), nodeName] }) || []
            )
            
            if (!childrens.length) {
                return null
            }

            return {
                type: NodeType.Directory,
                name: nodeName,
                fullName: nodeName,
                path: rootPath,
                childrens,
                parentFolders: options?.parentFolders || []
            } as Directory
        } else {
            throw new Error('Not a file, not a directory - what do you scan? :)')
        }
    }))
    return files.filter(e => !!e) as Nodes
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

export const getFileContent = async (file:File): Promise<string> => {
    return (await fs.readFile(`${file.path}/${file.fullName}`)).toString()
}