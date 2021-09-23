import {getObsidianFilesFlat, getFileContent, getObsidianFilesTree, PAGES_FILES_EXTENSIONS, MEDIA_FILES_EXTENSIONS} from './files'
import {getUrlToFile, findFileByUrl, slugToUrl} from './url'
import {File} from './types'
import {render} from './mdToHtml'
import {copyMediaToPublicFolder} from './media'

export type ObsidianNextConnectionProps = {
    vaultPath: string,
    assetPath: string,
    urlPagesPrefix: string
}
export const obsidianNextConnection = ({vaultPath, assetPath, urlPagesPrefix}: ObsidianNextConnectionProps) => {
    const getNextPaths = async () => {
        const filesFlat = await getObsidianFilesFlat(vaultPath, { filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
        return filesFlat.map(file => ({ params: { slug: getUrlToFile(file).split('/').filter(e => e) } }))
    }
    const getFilesTree = async () => getObsidianFilesTree(vaultPath,{ filesExtensionToAccept: PAGES_FILES_EXTENSIONS })

    const getFilesFlat = async () => await getObsidianFilesFlat(vaultPath, { filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
    const getFileBySlug = async (slug: string[]): Promise<File|null> => {
        const filesFlat = await getObsidianFilesFlat(vaultPath,  { filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
        return filesFlat.find(findFileByUrl(slugToUrl(slug))) || null
    } 
    const getFileContentAsHtml = async (file:File): Promise<{document: string, meta: any}> => {
        const filesFLat =  await getObsidianFilesFlat(vaultPath,  { filesExtensionToAccept: PAGES_FILES_EXTENSIONS })
        const filesFlatMedia = await getObsidianFilesFlat(vaultPath, { filesExtensionToAccept: MEDIA_FILES_EXTENSIONS })
        return render(await getFileContent(file), filesFLat, filesFlatMedia, urlPagesPrefix)
    }
    const prepareMediaFiles = async (): Promise<boolean> => {
        const filesFlatMedia = await getObsidianFilesFlat(vaultPath, { filesExtensionToAccept: MEDIA_FILES_EXTENSIONS })
        return copyMediaToPublicFolder(assetPath, filesFlatMedia)
    }
    return {getNextPaths, getFilesFlat, getFileBySlug, getFileContentAsHtml, prepareMediaFiles, getFilesTree}
}
