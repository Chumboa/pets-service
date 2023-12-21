import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dtos/create-pet.dto';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('pets')
@ApiTags('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {} 
    
    @Post()
    @ApiOperation({summary: 'Create a new Pet'})
    @ApiCreatedResponse({
        description: 'Pet has been succesfully created',
        type: Pet
    })
    createPet(
        @Body() createPetDto: CreatePetDto
    ) : Pet {
        console.log(`creating a pet ${JSON.stringify(createPetDto)}`);
        return this.petsService.insertPet(createPetDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all  Pets'})
    @ApiResponse({status: 200, description: 'OK'})
    getPets(): Pet[] {
        return this.petsService.getPets();
    }
    
    //localhost:3000/pets/cE6zgImClkMgpdcLTUZUW
    @Get(':id')
    @ApiOperation({summary: 'Get one Pet'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    getAPet(@Param('id') petId: string): Pet {
        return this.petsService.getOnePet(petId);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Pet updated'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    updatePet(
        @Param('id') petId: string,
        @Body() updatePetDto: UpdatePetDto
    ): Pet {
        return this.petsService.updateOnePet(petId, updatePetDto);
    }
    
    @Delete(':id')
    @ApiOperation({summary: 'Pet deleted'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    deletePet(@Param('id') petId: string): void {
        this.petsService.deleteAPet(petId);
    }
}
