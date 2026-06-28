import * as PrismaClientNamespace from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

const { PrismaClient } = PrismaClientNamespace as typeof PrismaClientNamespace & {
  PrismaClient: new (options?: any) => any;
};

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding lookup tables...");

  // ======================
  // SCHEMES
  // ======================
  const schemes = [
    "PM-JAY",
    "PM CARES",
    "NAMASTE",
  ];

  for (const name of schemes) {
    await prisma.scheme.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // ======================
  // SUB SCHEMES
  // ======================
  const subSchemes = [
    "BOCW",
    "Deen Dayal Upadhyay",
    "PM Janman (PVTG)",
    "PM-JAY",
    "PM-JAY-AAY",
  ];

  for (const name of subSchemes) {
    await prisma.subScheme.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // ======================
  // STATES
  // ======================
  const uttarPradesh = await prisma.stateLookup.upsert({
    where: {
      name: "Uttar Pradesh",
    },
    update: {},
    create: {
      name: "Uttar Pradesh",
    },
  });

  const delhi = await prisma.stateLookup.upsert({
    where: {
      name: "Delhi",
    },
    update: {},
    create: {
      name: "Delhi",
    },
  });

  const bihar = await prisma.stateLookup.upsert({
    where: {
      name: "Bihar",
    },
    update: {},
    create: {
      name: "Bihar",
    },
  });

  // ======================
  // DISTRICTS
  // ======================

  const upDistricts = [
    "Agra",
    "Aligarh",
    "Bijnor",
    "Jalaun",
    "Kanpur",
    "Lucknow",
    "Prayagraj",
    "Varanasi",
  ];

  for (const district of upDistricts) {
    await prisma.district.upsert({
      where: {
        name_stateId: {
          name: district,
          stateId: uttarPradesh.id,
        },
      },
      update: {},
      create: {
        name: district,
        stateId: uttarPradesh.id,
      },
    });
  }

  const delhiDistricts = [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "South Delhi",
    "West Delhi",
  ];

  for (const district of delhiDistricts) {
    await prisma.district.upsert({
      where: {
        name_stateId: {
          name: district,
          stateId: delhi.id,
        },
      },
      update: {},
      create: {
        name: district,
        stateId: delhi.id,
      },
    });
  }

  const biharDistricts = [
    "Patna",
    "Gaya",
    "Nalanda",
    "Bhagalpur",
    "Muzaffarpur",
  ];

  for (const district of biharDistricts) {
    await prisma.district.upsert({
      where: {
        name_stateId: {
          name: district,
          stateId: bihar.id,
        },
      },
      update: {},
      create: {
        name: district,
        stateId: bihar.id,
      },
    });
  }

  console.log("✅ Lookup tables seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });