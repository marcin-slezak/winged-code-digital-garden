import {getObsidianFilesTree, flatFilesList} from '../utils/obsidian/files'

(async () => {
    const nodes = await getObsidianFilesTree('./obsidianVault', {filesExtensionToAccept: ['.md']})
    console.log('NODES: ', nodes)
    console.log('FLAT LIST', flatFilesList(nodes))
})()