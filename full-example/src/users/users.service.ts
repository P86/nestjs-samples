import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly users: User[] = [];

  public async create(dto: CreateUserDto): Promise<string> {
    const user = new User(dto);
    await user.encryptPassword();

    this.users.push(user);

    return user.id;
  }

  public findAll(): User[] {
    return this.users;
  }

  public findOne(id: string): User {
    return this.users.find((u) => u.id === id);
  }

  public findOneByEmail(email: string): User {
    return this.users.find((u) => u.email === email);
  }

  public update(id: string, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (!user) {
      return;
    }

    user.update(dto);
    return user;
  }

  public remove(id: string) {
    const inndex = this.users.findIndex(u => u.id === id);
    if (inndex > 0) {
      this.users.splice(inndex, 1);
    }
  }
}
