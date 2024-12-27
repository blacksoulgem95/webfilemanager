import { ApiProperty } from '@nestjs/swagger';
import Usage from './Usage';
import RamUsage from './RamUsage';
import OsInfo from './OsInfo';

export class SystemStatus {
  @ApiProperty()
  cpu: Usage;
  @ApiProperty()
  disk: Usage;
  @ApiProperty()
  memory: RamUsage;
  @ApiProperty()
  os: OsInfo;
}