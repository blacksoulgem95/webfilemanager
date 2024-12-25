import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import * as os from 'os-utils';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SystemStatus } from '../dto/SystemStatus';
import FileService from '../services/file.service';
import { CommonFolder } from '../dto/CommonFolder';
import { multiply1024 } from '../services/utils/units';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(protected readonly fileService: FileService) {}

  @Get('/folders')
  @ApiTags('system')
  @ApiOperation({
    operationId: "getCommonFolders",
    description: "Retrieves the common folders of the system on which the backend is installed"
  })
  @ApiOkResponse({
    description: 'Common folders for the System',
    type: CommonFolder,
    isArray: true,
  })
  async getCommonFolders(@Res() res: Response) {
    const folders = await this.fileService.getCommonFolders();
    res.status(200).json(folders);
  }

  @Get()
  @ApiTags('system')
  @ApiOkResponse({
    description: 'Current status of the system',
    type: SystemStatus,
  })
  @ApiOperation({
    operationId: "getSystemStatus",
    description: "Retrieves the current status of the system"
  })
  async getSystemStatus(@Res() res: Response) {
    const disk = await new Promise((resolve) => {
      os.harddrive((total, free, used) => {
        resolve({
          count: multiply1024(total, 2),
          free: multiply1024(free, 2),
          usage: multiply1024(used, 2),
        });
      });
    });
    res.status(200).json({
      cpu: {
        count: os.cpuCount(),
        free: await new Promise((r) => os.cpuFree(r)),
        usage: await new Promise((r) => os.cpuUsage(r)),
      },
      os: {
        platform: os.platform(),
        processUptime: os.processUptime() * 1000,
        systemUptime: os.sysUptime() * 1000,
        loadAvg: os.allLoadavg(),
      },
      memory: {
        count: multiply1024(os.totalmem(), 2),
        free: multiply1024(os.freemem(), 2),
        freePerc: os.freememPercentage(),
      },
      disk,
    } as SystemStatus);
  }
}
