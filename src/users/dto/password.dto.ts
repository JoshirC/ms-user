import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class PasswordDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    repeatPassword: string;
}