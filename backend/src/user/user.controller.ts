import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { User } from './entities/user.entity';
import { Public } from '../auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getMe(@Request() req) {
    console.log(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('reset')
  resetPassword(@CurrentUser() user: User, @Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(user, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
