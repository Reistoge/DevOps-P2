import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Persona } from './persona.interface';

@Controller('personas')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Persona[] {
    return this.appService.getAll();
  }

  @Post()
  addPersona(@Body() persona: Persona): Persona {
    return this.appService.addPersona(persona);
  }

  @Delete(':rut')
  deletePersona(@Param('rut') rut: string): boolean {
    return this.appService.deletePersona(rut);
  }
}
