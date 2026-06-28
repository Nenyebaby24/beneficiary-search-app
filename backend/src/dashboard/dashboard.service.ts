import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getStats() {
  const beneficiaries =
    await this.prisma.beneficiary.count();

  const familyMembers =
    await this.prisma.familyMember.count();

  const maleBeneficiaries =
    await this.prisma.beneficiary.count({
      where: {
        gender: "Male",
      },
    });

  const femaleBeneficiaries =
    await this.prisma.beneficiary.count({
      where: {
        gender: "Female",
      },
    });

  const recentBeneficiaries =
    await this.prisma.beneficiary.findMany({
      take: 5,
      orderBy: {
        id: "desc",
      },
    });

  return {
    beneficiaries,
    familyMembers,
    maleBeneficiaries,
    femaleBeneficiaries,
    recentBeneficiaries,
  };
}
}