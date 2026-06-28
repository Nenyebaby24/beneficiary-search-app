import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BeneficiariesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  // ============================
  // Get All Beneficiaries
  // ============================

  async findAll(
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;

    const beneficiaries =
      await this.prisma.beneficiary.findMany({
        skip,
        take: limit,
        include: {
          familyMembers: true,
          scheme: true,
          subScheme: true,
          stateLookup: true,
          district: true,
        },
        orderBy: {
          id: "desc",
        },
      });

    const total =
      await this.prisma.beneficiary.count();

    return {
      data: beneficiaries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ============================
  // Create Beneficiary
  // ============================

  async create(data: any) {
    const count =
      await this.prisma.beneficiary.count();

    const beneficiaryNumber =
      `BEN${String(count + 1).padStart(6, "0")}`;

    const state =
      data.stateLookupId
        ? await this.prisma.stateLookup.findUnique({
            where: {
              id: data.stateLookupId,
            },
          })
        : null;

    return this.prisma.beneficiary.create({
      data: {
        beneficiaryNumber,

        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phone: data.phone,
        address: data.address,

        state: state?.name || "",

        lga: data.lga,
        ward: data.ward,

        schemeId: data.schemeId,
        subSchemeId: data.subSchemeId,
        stateLookupId: data.stateLookupId,
        districtId: data.districtId,
      },
    });
  }

  // ============================
  // Update Beneficiary
  // ============================

  async update(
    id: number,
    data: any,
  ) {
    const beneficiary =
      await this.prisma.beneficiary.findUnique({
        where: { id },
      });

    if (!beneficiary) {
      throw new NotFoundException(
        "Beneficiary not found",
      );
    }

    const state =
      data.stateLookupId
        ? await this.prisma.stateLookup.findUnique({
            where: {
              id: data.stateLookupId,
            },
          })
        : null;

    return this.prisma.beneficiary.update({
      where: {
        id,
      },
      data: {
        beneficiaryNumber:
          data.beneficiaryNumber ??
          beneficiary.beneficiaryNumber,

        firstName: data.firstName,

        lastName: data.lastName,

        gender: data.gender,

        phone: data.phone,

        address: data.address,

        state:
          state?.name ??
          beneficiary.state,

        lga: data.lga,

        ward: data.ward,

        schemeId: data.schemeId,

        subSchemeId: data.subSchemeId,

        stateLookupId: data.stateLookupId,

        districtId: data.districtId,
      },
    });
  }

  // ============================
  // Delete Beneficiary
  // ============================

  async remove(id: number) {
    const beneficiary =
      await this.prisma.beneficiary.findUnique({
        where: {
          id,
        },
      });

    if (!beneficiary) {
      throw new NotFoundException(
        "Beneficiary not found",
      );
    }

    return this.prisma.beneficiary.delete({
      where: {
        id,
      },
    });
  }

  // ============================
  // Get Single Beneficiary
  // ============================

  async findOne(id: number) {
    const beneficiary =
      await this.prisma.beneficiary.findUnique({
        where: {
          id,
        },
        include: {
          familyMembers: true,
          scheme: true,
          subScheme: true,
          stateLookup: true,
          district: true,
        },
      });

    if (!beneficiary) {
      throw new NotFoundException(
        "Beneficiary not found",
      );
    }

    return beneficiary;
  }

  // ============================
  // Search Beneficiaries
  // ============================

 async search(
  filters: any,
  page = 1,
  limit = 10,
) {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.beneficiaryNumber) {
    where.beneficiaryNumber = {
      contains: filters.beneficiaryNumber,
    };
  }

  if (filters.firstName) {
    where.firstName = {
      contains: filters.firstName,
      mode: "insensitive",
    };
  }

  if (filters.lastName) {
    where.lastName = {
      contains: filters.lastName,
      mode: "insensitive",
    };
  }

  if (filters.phone) {
    where.phone = {
      contains: filters.phone,
    };
  }

  if (filters.lga) {
    where.lga = {
      contains: filters.lga,
      mode: "insensitive",
    };
  }

  if (filters.ward) {
    where.ward = {
      contains: filters.ward,
      mode: "insensitive",
    };
  }

  if (filters.schemeId) {
    where.schemeId = Number(filters.schemeId);
  }

  if (filters.subSchemeId) {
    where.subSchemeId = Number(filters.subSchemeId);
  }

  if (filters.stateLookupId) {
    where.stateLookupId = Number(filters.stateLookupId);
  }

  if (filters.districtId) {
    where.districtId = Number(filters.districtId);
  }

  const beneficiaries =
    await this.prisma.beneficiary.findMany({
      where,
      skip,
      take: limit,
      include: {
        familyMembers: true,
        scheme: true,
        subScheme: true,
        stateLookup: true,
        district: true,
      },
      orderBy: {
        id: "desc",
      },
    });

  const total =
    await this.prisma.beneficiary.count({
      where,
    });

  return {
    data: beneficiaries,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  // ============================
  // Reports
  // ============================

  async getReports(
    state?: string,
    gender?: string,
  ) {
    const where: any = {};

    if (state) {
      where.state = state;
    }

    if (gender) {
      where.gender = gender;
    }

    return this.prisma.beneficiary.findMany({
      where,
      include: {
        familyMembers: true,
        scheme: true,
        subScheme: true,
        stateLookup: true,
        district: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }
}
