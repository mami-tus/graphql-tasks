import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // デフォルトではユーザーネームとパスワードでの認証になってるので、emailでの認証に変更
      // superで親クラスのコンストラクタを呼び出す
      usernameField: 'email',
    });
  }

  // validateメソッドは自動的に呼び出されるので命名を変えることはできない
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
