import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FamilyMembersService } from './family-members.service';

@UseGuards(JwtAuthGuard)
@Controller('family-members')
export class FamilyMembersController {
  constructor(
    private readonly familyMembersService: FamilyMembersService,
  ) {}

  @Get()
  findAll() {
    return this.familyMembersService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.familyMembersService.create(
      data,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.familyMembersService.remove(
      id,
    );
  }
}