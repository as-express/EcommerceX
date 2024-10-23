import { Injectable, Type } from '@nestjs/common';
import * as path from 'path';
import { v4 } from 'uuid';
import * as fs from 'fs';

export enum TYPE {
    AVATAR = 'avatars',
    IMAGE = 'images',
    ICON = 'icons',
}

@Injectable()
export class FileService {
    constructor() {}

    async writeFile(type: TYPE, file: any) {
        const fileType = file.originalname.split('.').pop();
        const fileName = v4() + '.' + fileType;
        const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads', type);

        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }

        fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'uploads', type, fileName), file.buffer);

        return type + '/' + fileName;
    }

    async removeFile(file: any) {
        const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads', file);
        fs.promises.unlink(filePath);

        console.log('File is deleted');
    }
}
