import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class dataDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    lastName: string;
}