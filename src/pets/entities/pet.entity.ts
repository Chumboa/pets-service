import { ApiProperty } from "@nestjs/swagger";

export class Pet {
    @ApiProperty()
    petId: String;

    @ApiProperty()
    name: String;

    @ApiProperty()
    description: String;

    @ApiProperty()
    dateOfBirth: string;
    constructor (
       petId: string,
       name : string,
       description: string,
       dateOfBirth: string
    ) {
        this.petId = petId;
        this.name = name;
        this.description = description;
        this.dateOfBirth = dateOfBirth;
    }
}