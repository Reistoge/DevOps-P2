import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Persona } from './persona.interface';

describe('AppController', () => {
  let appController: AppController;
  let appService: {
    getAll: jest.Mock;
    addPersona: jest.Mock;
    deletePersona: jest.Mock;
  };

  beforeEach(async () => {
    appService = {
      getAll: jest.fn(),
      addPersona: jest.fn(),
      deletePersona: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return all personas', () => {
    const personas: Persona[] = [
      {
        nombre: 'Ana Perez',
        rut: '33333333-3',
        fechaNacimiento: '1995-10-20',
        ciudad: 'Valparaiso',
      },
    ];

    appService.getAll.mockReturnValue(personas);

    expect(appController.getAll()).toEqual(personas);
    expect(appService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should add a persona', () => {
    const persona: Persona = {
      nombre: 'Ana Perez',
      rut: '33333333-3',
      fechaNacimiento: '1995-10-20',
      ciudad: 'Valparaiso',
    };

    appService.addPersona.mockReturnValue(persona);

    expect(appController.addPersona(persona)).toEqual(persona);
    expect(appService.addPersona).toHaveBeenCalledWith(persona);
  });

  it('should delete a persona by rut', () => {
    appService.deletePersona.mockReturnValue(true);

    expect(appController.deletePersona('11111111-1')).toBe(true);
    expect(appService.deletePersona).toHaveBeenCalledWith('11111111-1');
  });
});
