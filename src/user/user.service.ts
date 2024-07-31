import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './types/user.schema';
import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserTransformerService } from './user-transformer.service';
import { UserDto } from './types/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly transformService: UserTransformerService,
  ) {}

  async createUser(requestDto: CreateUserRequestDto): Promise<UserDto> {
    const sanitizedRequestDto =
      this.transformService.sanitizeCreateUserRequest(requestDto);
    const user = new this.userModel(sanitizedRequestDto);
    const userDto = await user.save();
    return this.transformService.toUserResponseDto(userDto);
  }

  async getMe(userId: string): Promise<UserDto> {
    const user = await this.userModel.findById(userId);
    return this.transformService.toUserResponseDto(user);
  }
}
