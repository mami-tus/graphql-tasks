import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // DBのコネクションを貼る
  async onModuleInit() {
    await this.$connect();
  }
}
