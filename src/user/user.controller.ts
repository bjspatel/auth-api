import { Public } from 'src/decorators/public.decorator';
import { UserId } from 'src/decorators/userid.decorator';

import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserService } from './user.service';

@Controller('user')
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
}
