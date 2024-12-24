import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SystemController } from "./controllers/system.controller";
import FileService from "./services/file.service";
import { ConfigModule } from '@nestjs/config';
import { FileController } from "./controllers/file.controller";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SystemController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
