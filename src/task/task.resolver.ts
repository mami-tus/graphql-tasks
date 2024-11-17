import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from 'src/task/models/task.model';
import { TaskService } from 'src/task/task.service';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  // getTasksがGraphQLのデータを取得するためのメソッドであることを伝えるために@Query()デコレータを使用
  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(
    @Args('name') name: string, // GraphQLのリクエストから情報を取り出すために@Argsつける

    @Args('dueDate') dueDate: string,

    @Args('description', { nullable: true }) description?: string,
  ): Task {
    return this.taskService.createTask(name, dueDate, description);
  }
}
