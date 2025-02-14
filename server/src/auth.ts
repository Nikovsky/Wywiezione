import { Module, Controller, Post, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt';
import * as argon2 from 'argon2';
import pool from './db';

@Injectable()
class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async validateUser(email: string, password: string) {
    const [result]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = result[0];
    if (!user) throw new UnauthorizedException('Invalid email or password');


    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

    return { id_user: user.id_user, email: user.email, role: user.role };
  }

  async login(user: { id_user: number; email: string; role: string }) {
    const payload = { sub: user.id_user, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    console.log("Generated JWT Token:", accessToken);
    return { accessToken };
  }
}

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ) {
    console.log('credentials:', credentials);
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );
    //return this.authService.login(user), { message: 'Login successful', user: { id_user: user.id_user, email: user.email, role: user.role } };
    return {
      ...(await this.authService.login(user)),
      message: 'Login successful',
      user: { id_user: user.id_user, email: user.email, role: user.role }
    };
  }
}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }