import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Persona } from './persona.interface';
import { PERSONAS_STUB } from './personas.stubs';

describe('AppService', () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the initial personas', () => {
        expect(service.getAll()).toEqual(PERSONAS_STUB);
    });

    it('should add a persona', () => {
        const persona: Persona = {
            nombre: 'Ana Perez',
            rut: '33333333-3',
            fechaNacimiento: '1995-10-20',
            ciudad: 'Valparaiso',
        };

        expect(service.addPersona(persona)).toEqual(persona);
        expect(service.getAll()).toContainEqual(persona);
    });

    it('should delete a persona by rut', () => {
        expect(service.deletePersona('11111111-1')).toBe(true);
        expect(service.getAll()).not.toContainEqual(
            expect.objectContaining({ rut: '11111111-1' }),
        );
    });

    it('should return false when persona does not exist', () => {
        expect(service.deletePersona('00000000-0')).toBe(false);
    });
});
