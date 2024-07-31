import { Public } from 'src/decorators/public.decorator';
import { UserId } from 'src/decorators/userid.decorator';

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserService } from './user.service';
import { UpdateUserRequestDto } from './types/update-user-request.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserRequestDto: CreateUserRequestDto,
  ) {
    return this.userService.createUser(createUserRequestDto);
  }

  @ApiBearerAuth()
  @Get('me')
  async getMe(@UserId() userId: string) {
    return this.userService.getUser(userId);
  }

  @ApiBearerAuth()
  @Put('me')
  async updateMe(
    @UserId() userId: string,
    @Body(new ValidationPipe()) requestDto: UpdateUserRequestDto,
  ) {
    return this.userService.update(userId, requestDto);
  }
}
