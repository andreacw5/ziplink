import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from '../url/url.entity';
import { UrlsModule } from '../url/urls.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import config from '../../configs/config.schema';
import { configValidationSchema } from '../../configs/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [Url],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UrlsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
