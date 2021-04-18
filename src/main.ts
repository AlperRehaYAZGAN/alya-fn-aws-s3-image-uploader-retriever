import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  const app_port = configService.get<number>('APP_PORT',3000);
  await app.listen(app_port);
}
bootstrap();
