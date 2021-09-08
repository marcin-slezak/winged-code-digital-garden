import { File } from './types'

export const encodeString = (s:string):string => encodeURIComponent(s.toLocaleLowerCase().replace(/\s/g, "-"))

export const getUrlToFile = (file: File, prefix?: string): string => {
    const folders = ([prefix, ...file.parentFolders]
        .filter(e =>!!e) as string[])
        .map(name => encodeString(name)).join('/')
    const name = encodeString(file.name)
    return `/${folders}/${name}`.replace(/\/\//g, "/")
}