import { ApiProperty } from '@nestjs/swagger';
import FileDto from './File';

export class CommonFolder extends FileDto {
  @ApiProperty()
  icon: string;
}