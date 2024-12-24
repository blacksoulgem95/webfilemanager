import { ApiProperty } from "@nestjs/swagger";

export default class RenameOperationRequest {
  @ApiProperty()
  originalFullPath: string

  @ApiProperty()
  newFullPath: string
}