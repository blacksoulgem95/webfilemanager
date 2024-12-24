import { Controller, Get, Render, Res } from "@nestjs/common";
import { Response } from 'express';
import * as os from "os-utils";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SystemStatus } from "../dto/SystemStatus";
import FileService from "../services/file.service";
import { CommonFolder } from "../dto/CommonFolder";

@ApiTags('system')
@Controller("system")
export class SystemController {
  constructor(protected readonly fileService: FileService) {}

  @Get('/folders')
  @ApiTags('system')
  @ApiOkResponse({
    description: "Common folders for the System",
    type: CommonFolder,
    isArray: true
  })
  async getCommonFolders(@Res() res: Response) {
    const folders = await this.fileService.getCommonFolders()
    res.status(200).json(folders)
  }

  @Get()
  @ApiTags('system')
  @ApiOkResponse({
    description: "Current status of the system",
    type: SystemStatus
  })
  async getSystemStatus(@Res() res: Response) {
    const disk = await new Promise((resolve) => {
      os.harddrive((total, free, used) => {
        resolve({
          count: total, free, used
        })
      })
    })
    res.status(200).json({
      cpu: {
        count: os.cpuCount(),
        free: await new Promise((r) => os.cpuFree(r)),
        usage: await new Promise((r) => os.cpuUsage(r)),
      },
      os: {
        platform: os.platform(),
        processUptime: os.processUptime(),
        systemUptime: os.sysUptime(),
        loadAvg: os.allLoadavg()
      },
      memory: {
        count: os.totalmem(),
        free: os.freemem(),
        freePerc: os.freememPercentage(),
      },
      disk
    } as SystemStatus)
  }
}
