import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    public async findAll(): Promise<User[]> {
        const users = await this.knex.table('users');
        console.log(users);
        return users;
    }
}