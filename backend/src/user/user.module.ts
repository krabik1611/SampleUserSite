import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.setupUserModule();
  }

  async setupUserModule() {
    const users = await this.userService.findAll();
    if (!users.length) {
      this.userService.create({
        username: this.configService.get('DEFAULT_USERNAME') as
          | string
          | 'admin',
        password: this.configService.get('DEFAULT_PASSWORD') as
          | string
          | 'admin',
      });
    }
  }
}
