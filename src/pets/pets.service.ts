import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dtos/create-pet.dto';
import { nanoid } from 'nanoid';
import { UpdatePetDto } from './dtos/update-pet.dto';

@Injectable()
export class PetsService {
    // in-memory db for pets
    pets: Pet[] = [];

    insertPet(createPetDto: CreatePetDto) : Pet {
        const id = nanoid();
        const pet = new Pet(id, createPetDto.name, createPetDto.description, createPetDto.dateOfBirth);
        this.pets.push(pet);
        console.log(`added a pet: ${JSON.stringify(pet)}`);
        return pet;
    }

    getPets(): Pet[] {
        //return a copy of the pets (not original)
        return [...this.pets]; 
    }

    getOnePet(petId: string): Pet {
        const idx = this.pets.findIndex((item) => item.petId === petId);

        if(idx >= 0) {
            const pet = this.pets[idx];
            return {...pet}
        }
        throw new NotFoundException('Could not find matching id');
    }

    updateOnePet(petId: string, updatePetDto: UpdatePetDto): Pet {
        const idx = this.pets.findIndex((item) => item.petId === petId);

        if(idx >= 0) {
            const pet = this.pets[idx];
            const updatedPet = {...pet};
            
            if(updatePetDto.name) {
                updatedPet.name = updatePetDto.name;
            }
            if(updatePetDto.description) {
                updatedPet.description = updatePetDto.description;
            }
            if(updatePetDto.dateOfBirth) {
                updatedPet.dateOfBirth = updatePetDto.dateOfBirth;
            }
            this.pets[idx] = updatedPet;

            return{...updatedPet};
        }
        throw new NotFoundException('Could not find matching id');
    }

    deleteAPet(petId: string): void {
        const idx = this.pets.findIndex((item) => item.petId === petId);

        if (idx >= 0) {
            console.log('Pet deleted successfully.');
            this.pets.splice(idx, 1);
        } else {
            console.log('Pet not found.');
            throw new NotFoundException('Could not find matching id');
        }
    }
}
