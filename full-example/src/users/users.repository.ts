import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { User } from "./entities/user.entity";
import { plainToInstance, instanceToInstance } from "class-transformer";

@Injectable()
export class UsersRepository {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    public async findAll(): Promise<User[]> {
        const users = await this.knex.table('users');
        return users.map(u => plainToInstance(User, u));
    }

    public async findOne(user: Partial<User>): Promise<User> {
        const result = await this.knex.table('users').where(user).first();
        return plainToInstance(User, result);
    }

    public async add(user: User): Promise<void> {
        await this.knex.table('users').insert(user);
    }

    public async save(user: User): Promise<void> {
        await this.knex.table('users').update(user).where({ id: user.id });
    }

    public async delete(id: string): Promise<void> {
        await this.knex.table('users').delete().where({ id: id });
    }
}