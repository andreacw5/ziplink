import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDTO {
  @ApiProperty()
  description: string;

  @ApiProperty({
    description: 'The URL to shorten',
    example: 'https://www.google.com',
  })
  url: string;

  @ApiProperty({
    description: 'The friendly code to use to access the URL',
    example: 'feedback-team',
  })
  code: string;

  @ApiProperty({
    description: 'Lock the url to prevent editing after creation',
    default: false,
  })
  protected: boolean;
}
