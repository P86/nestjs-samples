import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    //todo: implement proper login and token generation
    // https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt/src/auth/auth.module.ts
    public async login(dto: LoginDto) {
        const user = await this.usersService.findOneByEmail(dto.email);
        const ok = user && await user.verifyPassword(dto.password);
        if (!ok) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
