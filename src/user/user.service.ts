import * as bcrypth from 'bcrypt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    const existingUser = await this.userModel.findOne({
      email: sanitizedRequestDto.email,
    });
    if (existingUser) {
      throw new UnprocessableEntityException('User already exists');
    }
    const passwordHash = await bcrypth.hash(sanitizedRequestDto.password, 10);
    const dbInput = {
      email: sanitizedRequestDto.email,
      passwordHash,
    };
    const userDto = await this.userModel.create(dbInput);
    return this.transformService.toUserResponseDto(userDto);
  }

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.userModel.findById(userId);
    return this.transformService.toUserResponseDto(user);
  }
}
