import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import File from '../dto/File';
import { FileInterceptor } from '@nestjs/platform-express';
import RenameOperationRequest from '../dto/RenameOperationRequest';
import FileService from '../services/file.service';
import ApplicativeError from '../dto/ApplicativeError';
import { Response } from 'express';

@ApiTags('file')
@Controller('files')
export class FileController {
  private readonly logger = new Logger(FileController.name);

  constructor(protected readonly fileService: FileService) {}

  @Get(':path')
  @ApiTags('file')
  @ApiOkResponse({
    description: 'Returns the details of the file',
    type: File,
  })
  @ApiProduces('application/json')
  @ApiNotFoundResponse({
    description: 'The file is not found',
    type: ApplicativeError,
  })
  @ApiForbiddenResponse({
    description: 'The operation is not allowed',
    type: ApplicativeError,
  })
  @ApiInternalServerErrorResponse({
    description: 'An internal error has occurred',
    type: ApplicativeError,
  })
  @ApiOperation({
    operationId: 'getFile',
    description:
      'Gets the metadata of a single file of folder, if folder also the content light metadata is provided',
  })
  async getFile(@Param('path') path: string, @Res() res: Response) {
    this.logger.debug('GET File operation', path);
    try {
      const file = await this.fileService.getFile(path);
      res.status(200).json(file);
    } catch (error) {
      if (error instanceof ApplicativeError) {
        this.logger.error('Cannot getFile', path, error.toString());
        return res.status(error.status).json(error);
      } else {
        this.logger.error('Cannot getFile, unknown error', path);
        this.logger.debug('Cannot getFile, unknown error', path, error);
        return res
          .status(500)
          .json(new ApplicativeError(500, 'Unknown error occurred'));
      }
    }
  }

  @Delete(':path')
  @ApiTags('file')
  @ApiNoContentResponse({
    description: 'Deletes a file, or folder, and all its content',
    type: null,
  })
  @ApiNotFoundResponse({
    description: 'The file is not found',
    type: ApplicativeError,
  })
  @ApiForbiddenResponse({
    description: 'The operation is not allowed',
    type: ApplicativeError,
  })
  @ApiInternalServerErrorResponse({
    description: 'An internal error has occurred',
    type: ApplicativeError,
  })
  @ApiOperation({
    operationId: 'deleteFile',
    description: 'Deletes a single file',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param(':path') path: string, @Res() res: Response) {
    try {
      await this.fileService.removeFile(path);
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof ApplicativeError) {
        this.logger.error('Cannot deleteFile', path, error.toString());
        return res.status(error.status).json(error);
      } else {
        this.logger.error('Cannot deleteFile, unknown error', path);
        this.logger.debug('Cannot deleteFile, unknown error', path, error);
        return res
          .status(500)
          .json(new ApplicativeError(500, 'Unknown error occurred'));
      }
    }
  }

  @Post(':path')
  @ApiTags('file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file')!)
  @ApiOkResponse({
    description: 'Uploads a single file, and returns its metadata',
    type: File,
  })
  @ApiNotFoundResponse({
    description: 'The file is not found',
    type: ApplicativeError,
  })
  @ApiForbiddenResponse({
    description: 'The operation is not allowed',
    type: ApplicativeError,
  })
  @ApiInternalServerErrorResponse({
    description: 'An internal error has occurred',
    type: ApplicativeError,
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
  @ApiOperation({
    operationId: 'uploadFile',
    description: 'Uploads a single file',
  })
  async uploadFile(
    @Param('path') path: string,
    @UploadedFile('file')
    content: any,
    @Res() res: Response,
  ) {
    try {
      // todo
    } catch (error) {
      if (error instanceof ApplicativeError) {
        this.logger.error('Cannot uploadFile', path, error.toString());
        return res.status(error.status).json(error);
      } else {
        this.logger.error('Cannot uploadFile, unknown error', path);
        this.logger.debug('Cannot uploadFile, unknown error', path, error);
        return res
          .status(500)
          .json(new ApplicativeError(500, 'Unknown error occurred'));
      }
    }
  }

  @Put(':path')
  @ApiTags('file')
  @ApiOkResponse({
    description: 'Renames / Moves a file and returns the new metadata',
    type: File,
  })
  @ApiNotFoundResponse({
    description: 'The file is not found',
    type: ApplicativeError,
  })
  @ApiForbiddenResponse({
    description: 'The operation is not allowed',
    type: ApplicativeError,
  })
  @ApiInternalServerErrorResponse({
    description: 'An internal error has occurred',
    type: ApplicativeError,
  })
  @ApiOperation({
    operationId: 'renameFile',
    description: 'Renames / Moves a single file',
  })
  async renameFile(
    @Param('path') originalPath: string,
    @Body() renameOperation: RenameOperationRequest,
    @Res() res: Response,
  ) {
    try {
      // todo
    } catch (error) {
      if (error instanceof ApplicativeError) {
        this.logger.error(
          'Cannot renameFile',
          renameOperation,
          error.toString(),
        );
        return res.status(error.status).json(error);
      } else {
        this.logger.error('Cannot renameFile, unknown error', renameOperation);
        this.logger.debug(
          'Cannot renameFile, unknown error',
          renameOperation,
          error,
        );
        return res
          .status(500)
          .json(new ApplicativeError(500, 'Unknown error occurred'));
      }
    }
  }
}
