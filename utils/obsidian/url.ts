import { File } from './types'

export const getUrlToFile = (file: File, prefix?: string): string => {
    const folders = ([prefix, ...file.parentFolders]
        .filter(e =>!!e) as string[])
        .map(name => encodeURIComponent(name.toLocaleLowerCase().replace(/\s/g, "-"))).join('/')
    const name = encodeURIComponent(file.name.toLocaleLowerCase().replace(/\s/g, "-"))
    return `/${folders}/${name}`.replace(/\/\//g, "/")
}