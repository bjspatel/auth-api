import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body(new ValidationPipe()) createUserRequestDto: CreateUserRequestDto,
  ) {
    return this.userService.createUser(createUserRequestDto);
  }
}
