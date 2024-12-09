import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor(private readonly repository: UsersRepository) { }

  public async create(dto: CreateUserDto): Promise<string> {
    const user = new User(dto);
    await user.encryptPassword();

    //this.users.push(user);
    await this.repository.add(user);

    return user.id;
  }

  public async findAll(): Promise<User[]> {
    return this.repository.findAll();
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
