import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getReport(
    state?: string,
    gender?: string,
  ) {
    const where: any = {};

    if (state) {
      where.state = {
        contains: state,
        mode: 'insensitive',
      };
    }

    if (gender) {
      where.gender = gender;
    }

    const beneficiaries =
      await this.prisma.beneficiary.findMany({
        where,
        include: {
          familyMembers: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

    return beneficiaries;
  }
}