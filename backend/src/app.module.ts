import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    BeneficiariesModule,
    FamilyMembersModule,
    PrismaModule, // 👈 add this
    AuthModule,
    DashboardModule,
    ReportsModule,
    UsersModule,
    LookupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
