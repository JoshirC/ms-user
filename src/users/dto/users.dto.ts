import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UsersDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    lastName: string;

}