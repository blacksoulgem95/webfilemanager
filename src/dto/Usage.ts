import { ApiProperty } from '@nestjs/swagger';

export default class Usage {
  @ApiProperty() count?: number;
  @ApiProperty() free?: number;
  @ApiProperty() usage?: number;
}