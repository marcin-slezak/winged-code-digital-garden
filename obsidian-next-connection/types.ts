export enum NodeType { File, Directory }

export type File = {
    type: NodeType.File
    name: string
    fullName: string
    path: string
    parentFolders: string[]
}

export type Directory = {
    type: NodeType.Directory
    name: string
    fullName: string
    path: string
    parentFolders: string[]
    childrens: Nodes
}

export type Nodes = Array<Directory | File>