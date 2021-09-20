import { File } from './types'

export const encodeString = (s:string):string => encodeURIComponent(
        s.toLocaleLowerCase()
        .replace(/[^a-zA-Z0-6]/g, "-")
        // https://github.com/vercel/next.js/issues/11016
        // Nextjs does not like encoded string so get rid off as much as we can
    )

export const getUrlToFile = (file: File, prefix?: string): string => {
    const folders = ([prefix, ...file.parentFolders]
        .filter(e =>!!e) as string[])
        .map(name => encodeString(name)).join('/')
    const name = encodeString(file.name)
    return `/${folders}/${name}`.replace(/\/\//g, "/")
}

export const findFileByUrl = (url:string) => (file: File): boolean => url === getUrlToFile(file)

export const slugToUrl = (slug: string[] | null | undefined): string => `/${(slug || []).join('/')}`