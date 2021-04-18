import { Controller, Get, NotFoundException, Post, Query, Res, UnprocessableEntityException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { extname } from 'path';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getResource(@Query('key') key: string, @Res() res) {
    // default content type is json.
    res.setHeader('content-type', 'application/json');
    let resourceType = extname(key);
    switch (resourceType) {
      case '.webp':
        res.setHeader('content-type', 'image/webp');
        break;
      case '.png':
        res.setHeader('content-type', 'image/png');
        break;
      case '.jpeg':
        res.setHeader('content-type', 'image/jpeg');
        break;
      case '.jpg':
        res.setHeader('content-type', 'image/jpeg');
        break;
      default:
        throw new UnprocessableEntityException('Invalid image key ensured.');
        break;
    }

    try {
      const fileInfo = await this.appService.getS3Resource(key);
      if (fileInfo.Body) {
        res.setHeader('content-length', fileInfo.ContentLength);
        return await res.end(fileInfo.Body);
      } else {
        throw new NotFoundException('No resource found');
      }
    } catch (error) {
      throw new NotFoundException('No resource found');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('resource'))
  async uploadS3(@UploadedFile() file) {
    return file;
  }

}
