import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

//modified from create-pet.dto so we can make fields optional
//and update only one field e.g. name
export class UpdatePetDto {
    @ApiProperty({example: 'Pluto', description: 'Name of the pet'})
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty({example: 'Yellow funny dog', description: 'Short description of the pet'})
    @IsOptional()
    @IsString()
    @Length(10, 200)
    description?: string;

    @ApiProperty({example: '1950-02-28'})
    @IsOptional()
    @IsString()
    dateOfBirth?: string;
}