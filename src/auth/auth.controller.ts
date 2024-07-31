import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { LoginRequestDto } from './types/login-request.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './types/token-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() requestDto: LoginRequestDto,
    @Res() res: Response,
  ): Promise<TokenDto> {
    const tokenDto = await this.authService.login(requestDto);
    res.cookie('refreshToken', tokenDto.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return tokenDto;
  }

  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    res.status(200).send();
  }
}
