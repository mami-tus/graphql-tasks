import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  // 他のモジュールでPrismaServiceを使用できるようにするためにexportsを追加
  exports: [PrismaService],
})
export class PrismaModule {}
