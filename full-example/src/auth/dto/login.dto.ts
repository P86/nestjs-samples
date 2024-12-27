import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'User\'s email address', required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User\'s password', required: true })
    @IsNotEmpty()
    password: string;
}