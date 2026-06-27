import { Persona } from './persona.interface';

export const PERSONAS_STUB: Persona[] = [
  {
    nombre: 'Ferran Rojas',
    rut: '11111111-1',
    fechaNacimiento: '1990-01-01',
    ciudad: 'Santiago',
    preferences: {
      food: ['Pizza', 'Sushi'],
      books: ['1984', 'Dune'],
      games: ['Chess', 'Zelda'],
    },
  },
  {
    nombre: 'Maximo Sarno',
    rut: '22222222-2',
    fechaNacimiento: '1242-05-11',
    ciudad: 'La Tierra',
    preferences: {
      food: ['Asado', 'Empanadas'],
      books: ['El Quijote', 'Cien Años de Soledad'],
      games: ['Age of Empires', 'Minecraft'],
    },
  },
];
