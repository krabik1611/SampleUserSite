import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await User.create({
      username: createUserDto.username,
      password: await this.hashPassword(createUserDto.password),
    });
    await user.save();
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, { where: { id } });
  }

  async resetPassword(user: User, body: ResetPasswordDto) {
    //   get user from DB
    const existUser = await this.userRepository.findOne({
      where: {
        id: user.dataValues.id,
      },
    });

    const match = await this.matchPassword(body.password, existUser.password);
    if (match)
      throw new HttpException('Password already Set', HttpStatus.FORBIDDEN);

    const hashPassword = await this.hashPassword(body.password);
    return await this.update(user.dataValues.id, {
      password: hashPassword,
    });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async matchPassword(currentPassword, password) {
    return bcrypt.compare(password, currentPassword);
  }
}
