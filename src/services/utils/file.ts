import File from '../../dto/File';
import * as path from 'path';
import * as fs from 'fs/promises';

export async function extractMetadataFromFile(fullPath) {
  const stat = await fs.stat(fullPath);
  return {
    basePath: path.join(fullPath, '..'),
    filename: path.basename(fullPath),
    fileSize: stat.size,
    isFolder: stat.isDirectory(),
    isHidden: path.basename(fullPath).startsWith('.'),
    owner: '' + stat.uid,
    group: '' + stat.gid,
    createdAt: stat.birthtimeMs,
    updatedAt: stat.mtimeMs,
  } as File;
}