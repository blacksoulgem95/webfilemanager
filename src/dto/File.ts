import { ApiProperty } from "@nestjs/swagger";

export default class File {

  @ApiProperty()
  filename: string;

  @ApiProperty()
  basePath: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  createdAt: number = 0;

  @ApiProperty()
  updatedAt: number = 0;

  @ApiProperty()
  fileSize: number = 0;

  @ApiProperty()
  isFolder: boolean = false;

  @ApiProperty()
  isHidden: boolean = false;

  @ApiProperty({
    type: File,
    isArray: true,
    description: "Folder content returned on GET operations",
    readOnly: true
  })
  content: File[] = []
}
