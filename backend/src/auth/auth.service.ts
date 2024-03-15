import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(user: any) {
    const userValidation = await this.validateUser(
      user.username,
      user.password,
    );
    if (!userValidation) throw new UnauthorizedException();
    const payload = {
      username: userValidation.dataValues.username,
      sub: userValidation.dataValues.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await this.userService.matchPassword(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
