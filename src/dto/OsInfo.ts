import { ApiProperty } from "@nestjs/swagger";

export default class OsInfo {

  @ApiProperty() platform?: string;
  @ApiProperty() processUptime?: number;
  @ApiProperty() systemUptime?: number;
  @ApiProperty() loadAvg?: string;
}