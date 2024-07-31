import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserDto } from './types/user.dto';
import { UserDocument } from './types/user.schema';

@Injectable()
export class UserTransformerService {
  sanitizeCreateUserRequest(
    requestDto: CreateUserRequestDto,
  ): CreateUserRequestDto {
    return {
      email: requestDto.email.trim(),
      name: requestDto.name.trim(),
      password: requestDto.password,
    };
  }

  toUserResponseDto(user: UserDocument): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
