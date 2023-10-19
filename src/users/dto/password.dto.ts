import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PasswordDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    repeatPassword: string;
}