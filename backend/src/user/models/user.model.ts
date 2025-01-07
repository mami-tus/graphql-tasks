import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

// graphqlのObjectTypeデコレータを使ってUserクラスをGraphQLの型として定義
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  // パスワードは秘匿情報なのでHideFieldデコレータを使ってGraphQLのクライアントからは取得できないようにする
  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
