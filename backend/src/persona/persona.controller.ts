import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PersonaService } from './persona.service';
import type { Persona } from './persona.interface';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  getAll(): Persona[] {
    return this.personaService.getAll();
  }

  @Post()
  addPersona(@Body() persona: Persona): Persona {
    return this.personaService.addPersona(persona);
  }

  @Delete(':rut')
  deletePersona(@Param('rut') rut: string): boolean {
    return this.personaService.deletePersona(rut);
  }
}
