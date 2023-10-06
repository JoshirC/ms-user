import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SingInDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

}