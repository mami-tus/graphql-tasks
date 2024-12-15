import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from '@prisma/client';
import { CreateTaskInput } from 'src/task/dto/createTask.input';
import { Task as TaskModel } from 'src/task/models/task.model';
import { TaskService } from 'src/task/task.service';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  // getTasksがGraphQLのデータを取得するためのメソッドであることを伝えるために@Query()デコレータを使用
  @Query(() => [TaskModel], { nullable: 'items' })
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput, // GraphQLのリクエストから情報を取り出すために@Argsつける
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }
}
