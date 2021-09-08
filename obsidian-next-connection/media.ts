import {File} from './types'
import * as fs from 'fs/promises';
import * as path from 'path';

export const copyMediaToPublicFolder = async (assetPath:string, mediaFiles: File[]): Promise<boolean> => {
    await Promise.all(mediaFiles.map(file => fs.copyFile(`${file.path}/${file.fullName}`, path.join(assetPath, file.fullName))))
    return true
}