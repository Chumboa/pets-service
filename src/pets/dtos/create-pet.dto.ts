import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePetDto {
    @ApiProperty({example: 'Pluto', description: 'Name of the pet'})
    @IsString()
    name: string;
    
    @ApiProperty({example: 'Yellow funny dog', description: 'Short description of the pet'})
    @IsString()
    @Length(10, 200)
    description: string;

    @ApiProperty({example: '1950-02-28'})
    @IsString()
    dateOfBirth: string;
}