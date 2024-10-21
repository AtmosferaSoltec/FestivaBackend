import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticArtistaImage(imageName: string) {
    const path = join(__dirname, '../../static/artista', imageName);
    if (!existsSync(path)) throw new Error('Image not found');
    return path;
  }
}
