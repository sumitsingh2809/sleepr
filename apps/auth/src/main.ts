import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const HTTP_PORT = +configService.get('HTTP_PORT') || 3000;
  const TCP_PORT = +configService.get('TCP_PORT');

  app.connectMicroservice({ transport: Transport.TCP, options: { host: '0.0.0.0', port: TCP_PORT } });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Sleepr Auth')
    .setDescription('Sleepr Auth API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  await app.listen(HTTP_PORT);
  console.log('Auth service is running on port', HTTP_PORT);
}
bootstrap();
