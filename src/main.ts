import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('ZipLink App')
    .setDescription(
      'Url manager system with Rest API for management of short urls, click statistics and redirects by personalized code',
    )
    .setVersion('1.1.3')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const appPort = configService.get<number>('APP_PORT', 3000);
  await app.listen(appPort);

  Logger.log('App is running and is listening at: http://localhost:' + appPort);

  // Log all environment variables
  Logger.log('Configured environment variables:', {
    database: {
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      name: configService.get('database.name'),
    },
    defaults: {
      urlCode: configService.get('defaults.urlCode'),
      redirectUrl: configService.get('defaults.redirectUrl'),
    },
  });
}
bootstrap().then(() => {
  Logger.log('App running now!');
});
