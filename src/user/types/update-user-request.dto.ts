import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({
    description: 'The name of the User',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Email of the User',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The country of the User',
    type: String,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'Phone of the User',
    type: String,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
