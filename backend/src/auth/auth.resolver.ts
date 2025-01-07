import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { SignInInput } from 'src/auth/dto/signIn.input';
import { SignInResponse } from 'src/auth/dto/signInResponse';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  // signInメソッドの実行前にGqlAuthGuardによってLocalStrategyのvalidateメソッドが実行される
  // LocalStrategyの認証に成功したらsignInメソッドが実行される
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: any,
  ): Promise<SignInResponse> {
    return await this.authService.signIn(context.user);
  }
}
