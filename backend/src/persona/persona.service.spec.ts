import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonaService } from './persona.service';
import { PersonaEntity } from './entities/persona.entity';
import { Persona } from './persona.interface';
import { PERSONAS_STUB } from './personas.stubs';

describe('PersonaService', () => {
  let service: PersonaService;
  let repo: jest.Mocked<Partial<Repository<PersonaEntity>>>;

  beforeEach(async () => {
    repo = {
      find: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      count: jest.fn().mockResolvedValue(0),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonaService,
        { provide: getRepositoryToken(PersonaEntity), useValue: repo },
      ],
    }).compile();

    service = module.get<PersonaService>(PersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all personas', async () => {
    repo.find.mockResolvedValue(PERSONAS_STUB as PersonaEntity[]);

    const result = await service.getAll();
    expect(result).toEqual(PERSONAS_STUB);
  });

  it('should add a persona with preferences', async () => {
    const persona: Persona = {
      nombre: 'Ana Perez',
      rut: '33333333-3',
      fechaNacimiento: '1995-10-20',
      ciudad: 'Valparaiso',
      preferences: {
        food: ['Pasta', 'Ice Cream'],
        books: ['The Hobbit'],
        games: ['Mario Kart'],
      },
    };

    repo.save.mockResolvedValue(persona as PersonaEntity);

    const result = await service.addPersona(persona);
    expect(result).toEqual(persona);
    expect(repo.save).toHaveBeenCalledWith(persona);
  });

  it('should delete a persona by rut', async () => {
    repo.delete.mockResolvedValue({ affected: 1 } as any);

    const result = await service.deletePersona('11111111-1');
    expect(result).toBe(true);
    expect(repo.delete).toHaveBeenCalledWith({ rut: '11111111-1' });
  });

  it('should return false when persona does not exist', async () => {
    repo.delete.mockResolvedValue({ affected: 0 } as any);

    const result = await service.deletePersona('00000000-0');
    expect(result).toBe(false);
  });
});
