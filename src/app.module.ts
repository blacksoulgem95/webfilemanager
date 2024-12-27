import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SystemController } from './controllers/system.controller';
import FileService from './services/file.service';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './controllers/file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
  ],
  controllers: [AppController, SystemController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
