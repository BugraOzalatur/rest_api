import { IsNotEmpty, IsOptional,IsEmail, MinLength, } from "class-validator";

export class UpdateUserDto{
@IsOptional()
@IsNotEmpty()
name:string
@IsOptional()
@IsEmail()
email:string;

@IsOptional()
@MinLength(6)
password: string;

}

