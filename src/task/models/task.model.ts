import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  // 数値型（これはGraphQLのIntまたはFloatのいずれかにマッピングするため)は型引数が必要
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  @Field()
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  @Field({ nullable: true })
  description: string;
}
