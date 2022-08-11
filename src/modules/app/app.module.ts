import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from '../url/url.entity';
import { UrlsModule } from '../url/urls.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from '../../configs/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'url-manager',
      entities: [Url],
      synchronize: true,
    }),
    UrlsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
