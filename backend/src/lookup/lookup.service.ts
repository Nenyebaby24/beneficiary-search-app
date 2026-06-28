import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LookupService {
  constructor(private prisma: PrismaService) {}

  getSchemes() {
    return this.prisma.scheme.findMany({
      orderBy: { name: "asc" },
    });
  }

  getStates() {
    return this.prisma.stateLookup.findMany({
      orderBy: { name: "asc" },
    });
  }

  getSubSchemes() {
    return this.prisma.subScheme.findMany({
      orderBy: { name: "asc" },
    });
  }

  getDistricts(stateId: number) {
    return this.prisma.district.findMany({
      where: {
        stateId,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}