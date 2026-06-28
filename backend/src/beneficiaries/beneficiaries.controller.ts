import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BeneficiariesService } from './beneficiaries.service';

@UseGuards(JwtAuthGuard)
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(
    private readonly beneficiariesService: BeneficiariesService,
  ) {}

  @Get()
findAll(
  @Query("page") page = "1",
  @Query("limit") limit = "10",
) {
  return this.beneficiariesService.findAll(
    Number(page),
    Number(limit),
  );
}

  @Get("search")
search(
  @Query("beneficiaryNumber") beneficiaryNumber?: string,
  @Query("firstName") firstName?: string,
  @Query("lastName") lastName?: string,
  @Query("phone") phone?: string,

  @Query("schemeId") schemeId?: string,
  @Query("subSchemeId") subSchemeId?: string,

  @Query("stateLookupId") stateLookupId?: string,
  @Query("districtId") districtId?: string,

  @Query("lga") lga?: string,
  @Query("ward") ward?: string,

  @Query("page") page = "1",
  @Query("limit") limit = "10",
) {
  return this.beneficiariesService.search(
    {
      beneficiaryNumber,
      firstName,
      lastName,
      phone,

      schemeId,
      subSchemeId,

      stateLookupId,
      districtId,

      lga,
      ward,
    },
    Number(page),
    Number(limit),
  );
}

@Get("reports")
getReports(
  @Query("state") state?: string,
  @Query("gender") gender?: string,
) {
  return this.beneficiariesService.getReports(
    state,
    gender,
  );
}

  @Post()
  create(
    @Body() body: any,
  ) {
    return this.beneficiariesService.create(
      body,
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.beneficiariesService.update(
      id,
      body,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.beneficiariesService.remove(
      id,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.beneficiariesService.findOne(
      id,
    );
  }
}