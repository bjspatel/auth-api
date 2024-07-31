import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/types/user.schema';
import { UserTransformerService } from 'src/user/user-transformer.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { LoginRequestDto } from './types/login-request.dto';
import { TokenDto } from './types/token-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userTransformService: UserTransformerService,
  ) {}

  private async getTokens(user: UserDocument): Promise<TokenDto> {
    const payload = { userId: user._id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    ]);
    return {
      user: this.userTransformService.toUserResponseDto(user),
      accessToken,
      refreshToken,
    };
  }

  async login(requestDto: LoginRequestDto): Promise<TokenDto> {
    const user = await this.userModel.findOne({ email: requestDto.email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(
      requestDto.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    return this.getTokens(user);
  }

  async refreshToken(oldRefreshToken: string): Promise<TokenDto> {
    const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
      ignoreExpiration: true,
    });
    const user = await this.userModel.findById(
      new Types.ObjectId(payload.userId as string),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.getTokens(user);
  }
}
