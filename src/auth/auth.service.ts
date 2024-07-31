import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/types/user.schema';
import { LoginRequestDto } from './types/login-request.dto';
import { TokenDto } from './types/token-dto';
import { JwtService } from '@nestjs/jwt';
import { UserTransformerService } from 'src/user/user-transformer.service';

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
}
