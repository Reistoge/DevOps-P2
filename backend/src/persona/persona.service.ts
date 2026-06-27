import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './persona.interface';
import { PersonaEntity } from './entities/persona.entity';
import { PERSONAS_STUB } from './personas.stubs';

@Injectable()
export class PersonaService implements OnModuleInit {
  constructor(
    @InjectRepository(PersonaEntity)
    private readonly repo: Repository<PersonaEntity>,
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save(PERSONAS_STUB as PersonaEntity[]);
    }
  }

  async getAll(): Promise<Persona[]> {
    return this.repo.find();
  }

  async addPersona(persona: Persona): Promise<Persona> {
    return this.repo.save(persona as PersonaEntity);
  }

  async deletePersona(rut: string): Promise<boolean> {
    const result = await this.repo.delete({ rut });
    return (result.affected ?? 0) > 0;
  }
}
