import { PartialType } from "@nestjs/mapped-types";
import {  IsNumber, IsString , IsLatitude, IsLongitude, Min, Max, IsBoolean } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @Max(1000000)
    price: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    // @IsBoolean()
    // approved: boolean;

    @IsNumber() @IsLatitude()
    lat: number;

    @IsNumber() @IsLongitude()
    lng: number;


}

export class UpdateReportDto extends PartialType(CreateReportDto){}