import File from '../../dto/File';
import * as path from 'path';
import * as fs from 'fs/promises';

export async function extractMetadataFromFile(fullPath) {
  const stat = await fs.stat(fullPath);

  let isRoot = false;

  if (path.dirname(fullPath) === fullPath) {
    isRoot = true;
  }

  return {
    basePath: path.dirname(fullPath),
    filename: path.basename(fullPath),
    fileSize: stat.size,
    isFolder: stat.isDirectory(),
    isHidden: path.basename(fullPath).startsWith('.'),
    owner: '' + stat.uid,
    group: '' + stat.gid,
    createdAt: stat.birthtimeMs,
    updatedAt: stat.mtimeMs,
    isRoot,
  } as File;
}