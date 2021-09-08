import {File} from './types'
import * as fs from 'fs/promises';
import * as path from 'path';

export const copyMediaToPublicFolder = async (mediaFiles: File[]): Promise<boolean> => {
    await Promise.all(mediaFiles.map(file => fs.copyFile(`${file.path}/${file.fullName}`, path.join(process.cwd(), `public/assets/${file.fullName}`))))
    return true
}