import { Injectable } from '@nestjs/common';
import { Persona } from './persona.interface';

@Injectable()
export class AppService {
  private personas: Persona[] = [];

  getAll(): Persona[] {
    return this.personas;
  }

  addPersona(persona: Persona): Persona {
    this.personas.push(persona);
    return persona;
  }

  deletePersona(rut: string): boolean {
    const cantidadAntes = this.personas.length;

    this.personas = this.personas.filter((persona) => persona.rut !== rut);

    return this.personas.length < cantidadAntes;
  }
}
