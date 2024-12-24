export * from './file.service';
import { FileService } from './file.service';
export * from './system.service';
import { SystemService } from './system.service';
export const APIS = [FileService, SystemService];
