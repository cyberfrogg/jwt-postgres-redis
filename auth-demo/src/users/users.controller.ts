import { Controller, Get, UseGuards } from '@nestjs/common';

import { ActiveUser } from '../common/decorators';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@ActiveUser('id') userId: string): Promise<User> {
    return this.usersService.getMe(userId);
  }
}
