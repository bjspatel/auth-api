import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Id of the user',
  })
  id: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Country of the user',
  })
  country: string;

  @ApiProperty({
    type: String,
    description: 'Phone of the user',
  })
  phone: string;

  @ApiProperty({
    type: Date,
    description: 'Date of creation',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date of last update',
  })
  updatedAt: Date;
}
