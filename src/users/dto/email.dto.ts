import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class emailDTO {
    @IsNotEmpty()
    @IsEmail()
    newEmail: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}