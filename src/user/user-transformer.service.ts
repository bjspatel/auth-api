import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserDto } from './types/user.dto';
import { UserDocument } from './types/user.schema';
import { UpdateUserRequestDto } from './types/update-user-request.dto';

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

  sanitizeUpdateUserRequest(
    updateUserRequestDto: UpdateUserRequestDto,
  ): UpdateUserRequestDto {
    const sanitizedRequest: UpdateUserRequestDto = {};
    if (updateUserRequestDto.name) {
      sanitizedRequest.name = updateUserRequestDto.name;
    }
    if (updateUserRequestDto.email) {
      sanitizedRequest.email = updateUserRequestDto.email;
    }
    if (updateUserRequestDto.country) {
      sanitizedRequest.country = updateUserRequestDto.country;
    }
    if (updateUserRequestDto.phone) {
      sanitizedRequest.phone = updateUserRequestDto.phone;
    }

    return sanitizedRequest;
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
