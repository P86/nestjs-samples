import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'test@test.com', required: true, description: 'Email address of user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'User password', required: true })
    password: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'User first name', required: true })
    firstName: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'User last name', required: true })
    lastName: string;
}