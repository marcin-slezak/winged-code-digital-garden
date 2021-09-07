import {File} from './types'
export const getUrlToFile = (file: File):string => {
    const folders = file.parentFolders.map(name => encodeURIComponent(name.toLocaleLowerCase().replace(/\s/g, "-"))).join('/')
    const name = encodeURIComponent(file.name.toLocaleLowerCase().replace(/\s/g, "-").replace(/\.md/g, ""))
    return `/${folders}/${name}`
}