import { Injectable, Logger } from '@nestjs/common';
import { readdir, rm, rename, rmdir, writeFile } from 'fs/promises';
import { CommonFolder } from '../dto/CommonFolder';
import { join } from 'path';
import { extractMetadataFromFile } from './utils/file';
import ApplicativeError from '../dto/ApplicativeError';

@Injectable()
export default class FileService {
  private readonly logger = new Logger(FileService.name);

  async getMetadata(path: string) {
    try {
      return await extractMetadataFromFile(path);
    } catch (e) {
      if (e.code === 'ENOENT') {
        // file does not exist
        return null;
      }

      if (e.code === 'EPERM') {
        // not allowed
        return null;
      }

      throw e;
    }
  }

  async getCommonFolders() {
    const homePath = process.env['WFM_HOME_PATH'];
    const basePath = process.env['WFM_BASE_PATH'];

    const files: CommonFolder[] = [];

    const home = (await this.getMetadata(homePath)) as CommonFolder;
    const base = (await this.getMetadata(basePath)) as CommonFolder;

    home.icon = 'home';
    base.icon = 'root';

    files.push(home);
    files.push(base);

    return files;
  }

  // TODO: to all methods, check that file is in the scope of the application (subpath of WFM Root)
  async getFile(path: string) {
    const file = await this.getMetadata(path);
    if (!file) {
      throw new ApplicativeError(404, 'File or Directory not found');
    }

    if (file.isFolder) {
      this.logger.debug('file', file);

      const folderPath = file.isRoot
        ? file.basePath
        : join(file.basePath, file.filename);

      let files = await readdir(folderPath);

      file.content = (
        await Promise.all(
          files.map((name) => join(folderPath, name)).map(this.getMetadata),
        )
      ).filter((itm) => !!itm);
    }

    return file;
  }

  async renameFile(originalPath: string, destinationPath: string) {
    if (!(await this.getMetadata(originalPath))) {
      throw new ApplicativeError(404, 'File or Directory not found');
    }

    if (await this.getMetadata(destinationPath)) {
      throw new ApplicativeError(403, 'Destination already existing');
    }

    await rename(originalPath, destinationPath);
  }

  async removeFile(path: string) {
    const file = await this.getMetadata(path);
    if (!file) {
      throw new ApplicativeError(404, 'File or Directory not found');
    }

    if (file.isFolder) {
      await rmdir(path, {});
    } else {
      await rm(path, {});
    }
  }

  async addFile(path: string, content: Buffer) {
    if (await this.getMetadata(path)) {
      throw new ApplicativeError(403, 'File already existing');
    }

    await writeFile(path, content);
  }
}
