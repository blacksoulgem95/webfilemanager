import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { CommonFolder } from '../dto/CommonFolder';
import * as path from 'path';
import { extractMetadataFromFile } from "./utils/file";

@Injectable()
export default class FileService {
  async getCommonFolders() {
    const homePath = process.env['WFM_HOME_PATH'];
    const basePath = process.env['WFM_BASE_PATH'];

    const files: CommonFolder[] = [];

    const home = await extractMetadataFromFile(homePath) as CommonFolder;
    const base = await extractMetadataFromFile(basePath) as CommonFolder;

    home.icon = 'home'
    base.icon = 'root'

    files.push(home);
    files.push(base);

    return files
  }
}
