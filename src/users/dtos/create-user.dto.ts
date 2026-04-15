import { IsEmail, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreatUserDto{

    @IsEmail()
    email: string;
    @IsString()
    password: string;
}

//create update user dto using partial type

export class UpdateUserDto extends PartialType(CreatUserDto){}
