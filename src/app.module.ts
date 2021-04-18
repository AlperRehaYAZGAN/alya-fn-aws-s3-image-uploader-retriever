import { Module, UnprocessableEntityException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { extname } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as multerS3 from 'multer-s3';


export const imageFileFilter = (req, file, callback) => {
  // check file from file name
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new UnprocessableEntityException('Only jpg|jpeg|png|gif types allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  // generate new file name
  let name: string = file.originalname.split('.')[0];
  name = name.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  // const name = new Date().getTime(); // you can use timestamps instead
  const fileExtName = extname(file.originalname).toLowerCase();
  // generate 4 char for prevent conflict
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: multerS3({
          s3: new S3({
            accessKeyId: configService.get<string>('AWS_S3_ACCESS_ID'),
            secretAccessKey: configService.get<string>('AWS_S3_SECRET_KEY'),
            region: configService.get<string>('AWS_S3_REGION')
          }),
          bucket: configService.get<string>('AWS_S3_BUCKET_NAME'),
          key: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
