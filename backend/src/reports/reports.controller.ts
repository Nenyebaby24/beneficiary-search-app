import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get()
  getReport(
    @Query('state') state?: string,
    @Query('gender') gender?: string,
  ) {
    return this.reportsService.getReport(
      state,
      gender,
    );
  }
}