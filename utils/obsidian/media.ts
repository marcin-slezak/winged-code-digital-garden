import {File} from './types'
import * as fs from 'fs/promises';
import * as path from 'path';

const getAssetsFolderPath = () => path.join(process.cwd(), 'public/assets/')

export const copyMediaToPublicFolder = async (mediaFiles: File[]): Promise<boolean> => {
    await Promise.all(mediaFiles.map(file => fs.copyFile(`${file.path}/${file.fullName}`, path.join(getAssetsFolderPath(), file.fullName))))
    return true
}