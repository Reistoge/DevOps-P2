import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PersonaService } from './persona.service';
import type { Persona } from './persona.interface';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  async getAll(): Promise<Persona[]> {
    return this.personaService.getAll();
  }

  @Post()
  async addPersona(@Body() persona: Persona): Promise<Persona> {
    return this.personaService.addPersona(persona);
  }

  @Delete(':rut')
  async deletePersona(@Param('rut') rut: string): Promise<boolean> {
    return this.personaService.deletePersona(rut);
  }
}
