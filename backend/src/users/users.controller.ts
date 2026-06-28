import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
findAll() {
  return this.usersService.findAll();
}

  @Get("profile")
  getProfile(
    @Req() req,
  ) {
    return this.usersService.getProfile(
      req.user.userId,
    );
  }

  @Put("profile")
  updateProfile(
    @Req() req,
    @Body() body: any,
  ) {
    return this.usersService.updateProfile(
      req.user.userId,
      body,
    );
  }

  @Post("change-password")
changePassword(
  @Req() req,
  @Body() body: any,
) {
  return this.usersService.changePassword(
    req.user.userId,
    body.oldPassword,
    body.newPassword,
  );
}

// =============================
// Create User
// =============================
@Post()
createUser(
  @Body() body: any,
) {
  return this.usersService.createUser(body);
}

@Put(":id")
updateUser(
  @Param("id") id: string,
  @Body() body: any,
) {
  return this.usersService.updateUser(
    Number(id),
    body,
  );
}

@Delete(":id")
removeUser(
  @Param("id") id: string,
) {
  return this.usersService.removeUser(
    Number(id),
  );
}

}