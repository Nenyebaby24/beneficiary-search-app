import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString:
    'postgresql://beneficiary_user:MyStrongPassword123@localhost:5432/beneficiary_db',
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash(
    'admin123',
    10,
  );

  const user = await prisma.user.create({
  data: {
    firstName: "System",
    lastName: "Administrator",
    phone: "08012345678",
    password: hashedPassword,
    role: "admin",
  },
});
  console.log('✅ Admin created');
  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });