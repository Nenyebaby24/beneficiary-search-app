import { Test, TestingModule } from "@nestjs/testing";
import { BeneficiariesService } from "./beneficiaries.service";
import { PrismaService } from "../prisma/prisma.service";

describe("BeneficiariesService", () => {
  let service: BeneficiariesService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          BeneficiariesService,

          {
            provide: PrismaService,
            useValue: {
              beneficiary: {},
              stateLookup: {},
            },
          },
        ],
      }).compile();

    service =
      module.get<BeneficiariesService>(
        BeneficiariesService,
      );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
