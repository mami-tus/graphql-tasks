import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// GqlAuthGuardはローカルストラテジー用のAuthGuardとしたいので、AuthGuardにlocalを指定
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    // superは親クラスのコンストラクタを呼び出す
    super();
  }

  // ExecutionContextは実行コンテキストで、リクエスト情報や実行中のリゾルバの情報を取得できる
  // getRequestメソッドは親クラスのAuthGuardにあるメソッドだが、それがREST API用のものなので、GraphQL用にオーバーライドする
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs().signInInput;
    return request;
  }
}
