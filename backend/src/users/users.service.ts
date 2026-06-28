import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async getProfile(userId: number) {

    const user =
      await this.prisma.user.findUnique({

        where: {
          id: userId,
        },

        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
        },

      });

    if (!user) {

      throw new NotFoundException(
        "User not found",
      );

    }

    return user;

  }

  // Update Profile

async updateProfile(
  userId: number,
  data: any,
) {

  return this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });

}

// Change Password
async changePassword(
  userId: number,
  oldPassword: string,
  newPassword: string,
) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundException(
      'User not found',
    );
  }

  const valid = await bcrypt.compare(
    oldPassword,
    user.password,
  );

  if (!valid) {
    throw new BadRequestException(
      'Old password is incorrect',
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10,
    );

  await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  

  return {
    message:
      'Password updated successfully',
  };
}
// =============================
// Create User
// =============================
async createUser(data: any) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    10,
  );

  return this.prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
    },
  });
}

// ===============================
// Get All Users
// ===============================

async findAll() {
  return this.prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
    },
  });
}

// ===============================
// Update User
// ===============================

async updateUser(
  id: number,
  data: any,
) {
  return this.prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
    },
  });
}

async removeUser(id: number) {
  return this.prisma.user.delete({
    where: {
      id,
    },
  });
}
}