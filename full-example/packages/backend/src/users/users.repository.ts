import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
import { UserEntity } from "./entities/user.entity";
import { plainToInstance, instanceToInstance } from "class-transformer";

@Injectable()
export class UsersRepository {
    constructor(@InjectConnection() private readonly knex: Knex) { }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.knex.table('users');
        return users.map(u => plainToInstance(UserEntity, u));
    }

    public async findOne(user: Partial<UserEntity>): Promise<UserEntity> {
        const result = await this.knex.table('users').where(user).first();
        return plainToInstance(UserEntity, result);
    }

    public async add(user: UserEntity): Promise<void> {
        await this.knex.table('users').insert(user);
    }

    public async save(user: UserEntity): Promise<void> {
        await this.knex.table('users').update(user).where({ id: user.id });
    }

    public async delete(id: string): Promise<void> {
        await this.knex.table('users').delete().where({ id: id });
    }
}