import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    //todo: implement proper login and token generation
    // https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt/src/auth/auth.module.ts
    public async login(dto: LoginDto): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(dto.email);
        const ok = user && await user.verifyPassword(dto.password);
        if (!ok) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
