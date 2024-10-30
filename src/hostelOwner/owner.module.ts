import { Module } from '@nestjs/common';
import { UserController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [OwnerService, PrismaService],
})
export class OwnerModule {}