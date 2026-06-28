import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyMembersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.familyMember.findMany({
      include: {
        beneficiary: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.familyMember.create({
      data: {
        name: data.name,
        relationship:
          data.relationship,
        age: Number(data.age),
        gender: data.gender,

        beneficiary: {
          connect: {
            id: Number(
              data.beneficiaryId,
            ),
          },
        },
      },
    });
  }

  async remove(id: number) {
    const member =
      await this.prisma.familyMember.findUnique({
        where: {
          id,
        },
      });

    if (!member) {
      throw new NotFoundException(
        'Family member not found',
      );
    }

    return this.prisma.familyMember.delete({
      where: {
        id,
      },
    });
  }
}