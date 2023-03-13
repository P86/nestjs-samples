import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public getUsers(): User[] {
    return this.users;
  }

  public getUser(id: number): User {
    return this.users.find((u) => u.id === id);
  }

  public addUser(dto: CreateUserDto): User {
    const ids = this.users.map((user) => user.id);
    const newUser = new User(Math.max(...ids, 0) + 1, dto.name); //not thread safe :D
    this.users.push(newUser);

    return newUser;
  }

  public deleteUser(id: number): void {
    const indexOfUser = this.users.findIndex((u) => u.id === id);
    if (indexOfUser) {
      this.users.splice(indexOfUser, 1);
    }
  }
}
