import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class dataDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}