import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './types/login-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() requestDto: LoginRequestDto, @Res() res: Response) {
    try {
      const tokenDto = await this.authService.login(requestDto);
      res.cookie('refreshToken', tokenDto.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      delete tokenDto.refreshToken;
      res.send(tokenDto);
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  @Public()
  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }
    try {
      const authDto = await this.authService.refreshToken(oldRefreshToken);
      res.cookie('refreshToken', authDto.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
      res.send(authDto);
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  }

  @Public()
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    res.status(200).send();
  }
}
