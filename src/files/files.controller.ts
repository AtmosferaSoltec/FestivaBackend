import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get("artista/:imageName")
  getArtistaImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticArtistaImage(imageName);
    res.sendFile(path);
  }

  @Post('artista')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/artista',
        filename: fileNamer,
      }),
    }),
  )
  uploadArtistaImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('No file uploaded');
    const host = process.env.HOST_API
    const secureUrl = `${host}/files/artista/${file.filename}`;
    return { 
      secureUrl,
      fileName: file.filename,
     };
  }
}
