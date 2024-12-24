import Usage from './Usage';
import { ApiProperty } from '@nestjs/swagger';

export default class RamUsage extends Usage {
  @ApiProperty() freePerc: number;
}