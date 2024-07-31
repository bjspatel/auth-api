import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/types/user.dto';

export class TokenDto {
  @ApiProperty({
    type: UserDto,
    description: 'User object',
  })
  user: UserDto;

  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token',
  })
  refreshToken: string;
}
