import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from '@prisma/client';
import { CreateTaskInput } from 'src/task/dto/createTask.input';
import { UpdateTaskInput } from 'src/task/dto/updateTask.input';
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

  @Mutation(() => TaskModel)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }
  @Mutation(() => TaskModel)
  // @ArgsでGraphQL側の引数は'id'をTypeScriptの引数idにマッピング
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
