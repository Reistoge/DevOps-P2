import { Test, TestingModule } from '@nestjs/testing';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { Persona } from './persona.interface';

describe('PersonaController', () => {
  let controller: PersonaController;
  let service: {
    getAll: jest.Mock;
    addPersona: jest.Mock;
    deletePersona: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      getAll: jest.fn(),
      addPersona: jest.fn(),
      deletePersona: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
      providers: [{ provide: PersonaService, useValue: service }],
    }).compile();

    controller = module.get<PersonaController>(PersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all personas', async () => {
    const personas: Persona[] = [
      {
        nombre: 'Ana Perez',
        rut: '33333333-3',
        fechaNacimiento: '1995-10-20',
        ciudad: 'Valparaiso',
        preferences: {
          food: ['Pasta'],
          books: ['The Hobbit'],
          games: ['Mario Kart'],
        },
      },
    ];

    service.getAll.mockReturnValue(personas);

    await expect(controller.getAll()).resolves.toEqual(personas);
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('should add a persona', async () => {
    const persona: Persona = {
      nombre: 'Ana Perez',
      rut: '33333333-3',
      fechaNacimiento: '1995-10-20',
      ciudad: 'Valparaiso',
      preferences: {
        food: ['Pasta'],
        books: ['The Hobbit'],
        games: ['Mario Kart'],
      },
    };

    service.addPersona.mockReturnValue(persona);

    await expect(controller.addPersona(persona)).resolves.toEqual(persona);
    expect(service.addPersona).toHaveBeenCalledWith(persona);
  });

  it('should delete a persona by rut', async () => {
    service.deletePersona.mockReturnValue(true);

    await expect(controller.deletePersona('11111111-1')).resolves.toBe(true);
    expect(service.deletePersona).toHaveBeenCalledWith('11111111-1');
  });
});
