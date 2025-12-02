import fs, { writeFile } from 'fs/promises';
import path from 'path';

export class FileSaver {
    private pathDownload: string;
    private fullPath = '';

    constructor(pathDownload: string = './download') {
        this.pathDownload = pathDownload;
    }

    async createDir(dirName: string): Promise<FileSaver> {
        const filePath = path.join(this.pathDownload, dirName);
        this.fullPath = await fs.mkdir(filePath, { recursive: true }) || '';
        return this;
    }

    async saveFile(fileName: string, data: Buffer) {
        const filePath = path.join(this.fullPath, fileName);
        await writeFile(filePath, data);
        return filePath;
    }
}