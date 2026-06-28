import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    phone: string,
    password: string,
  ) {
    const user = await this.prisma.user.findUnique({
  where: {
    phone,
  },
});

console.log('USER FOUND:', user);

if (!user) {
  throw new UnauthorizedException(
    'Invalid credentials',
  );
}

const isValid = await bcrypt.compare(
  password,
  user.password,
);

console.log('PASSWORD VALID:', isValid);

if (!isValid) {
  throw new UnauthorizedException(
    'Invalid credentials',
  );
}

    const accessToken = this.jwtService.sign({
      sub: user.id,
      phone: user.phone,
      role: user.role,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,

        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    };
  }
}