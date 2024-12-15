import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // PrismaModuleでPrismaServiceをexportしているのでTaskServiceやTaskResolverでPrismaServiceを使用できる
  imports: [PrismaModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
