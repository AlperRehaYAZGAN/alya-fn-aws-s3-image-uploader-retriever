import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AppService {
  private s3Instance: S3;
  private s3BucketName: string;
  constructor(private configService: ConfigService) {
    // init S3 Instance
    this.s3Instance = new S3({
      accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_ID'),
      secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_KEY'),
      region: this.configService.get<string>('AWS_S3_REGION')
    });
    // set bucket name
    this.s3BucketName = configService.get<string>('AWS_S3_BUCKET_NAME');

  }

  async getS3Resource(key : string) : Promise<S3.GetObjectOutput> {
    const fileCredentials = {
      Bucket: this.s3BucketName,
      Key: key,
    };

    return new Promise((resolve, reject) => {
      this.s3Instance.getObject(fileCredentials, function (err, data) {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

}
