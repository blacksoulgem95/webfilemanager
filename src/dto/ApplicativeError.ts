import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export default class ApplicativeError {
  @ApiProperty({
    example: 404,
    description: "Error code"
  })
  status: number;
  @ApiProperty({
    example: "File not found",
    description: "Details of the error"
  })
  message?: string;

  constructor(status: number, message?: string) {
    this.status = status;
    this.message = message;
  }

  toString(): string {
    return JSON.stringify(
      this,
      (key, value) => (key === 'toString' ? undefined : value),
      2,
    );
  }
}
