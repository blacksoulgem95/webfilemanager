import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpStatus,
  Param,
  Post, Put,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import File from '../dto/File';
import { FileInterceptor } from '@nestjs/platform-express';
import RenameOperationRequest from "../dto/RenameOperationRequest";

@ApiTags('file')
@Controller('files')
export class FileController {
  constructor() {}

  @Get(':path')
  @ApiTags('file')
  @ApiOkResponse({
    description: 'Returns the details of the file',
    type: File,
  })
  getFile(@Param('path') path: String, @Res() res: Response) {}

  @Delete(':path')
  @ApiTags('file')
  @ApiOkResponse({
    description: 'Deletes a file, or folder, and all its content',
    type: null,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFile(@Param(':path') path: String, @Res() res: Response) {}

  @Post(':path')
  @ApiTags('file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file')!)
  @ApiOkResponse({
    description: 'Uploads a single file, and returns its metadata',
    type: File,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @Param('path') path: String,
    @UploadedFile("file")
    content: any,
    @Res() res: Response,
  ) {}

  @Put(":path")
  @ApiTags('file')
  @ApiOkResponse({
    description: "Renames / Moves a file and returns the new metadata",
    type: File
  })
  renameFile(
    @Param('path') originalPath: string,
    @Body() renameOperation: RenameOperationRequest) {

  }
}
