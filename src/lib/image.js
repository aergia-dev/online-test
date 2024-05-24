import fs from 'fs';
import path from 'path';

const defaultPath = './db/img/'
export async function loadImage(fileName) {
    const filePath = path.resolve(defaultPath + fileName);

    try {
        const base64tr = fs.readFileSync(filePath, 'utf-8');
        return base64tr;
    } catch (error) {
        console.error('error loading file: ', error);
    }

    return '';
}