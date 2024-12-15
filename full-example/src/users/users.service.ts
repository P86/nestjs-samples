import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor(private readonly repository: UsersRepository) { }

  public async findOne(id: string): Promise<User> {
    return this.repository.findOne({ id: id });
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email: email });
  }

  public async create(dto: CreateUserDto): Promise<string> {
    const user = new User(dto);
    await user.encryptPassword();

    await this.repository.add(user);

    return user.id;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }

    user.update(dto);

    await this.repository.save(user);
    return user;
  }
}
