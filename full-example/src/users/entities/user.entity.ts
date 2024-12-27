import { Exclude, Expose } from "class-transformer";
import { randomUUID } from 'node:crypto';
import * as argon2 from "argon2";
import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @Exclude({ toPlainOnly: true })
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(user: Partial<User>) {
        Object.assign(this, user);

        this.id = this.id ?? randomUUID();
    }

    public update(user: Partial<User>): void {
        // not editable
        const changes = structuredClone(user);
        delete changes.id;
        delete changes.email;
        delete changes.password;

        Object.assign(this, changes);
    }

    public async encryptPassword(): Promise<void> {
        this.password = await argon2.hash(this.password);
    }

    public async verifyPassword(password: string): Promise<boolean> {
        return argon2.verify(this.password, password);
    }
}
