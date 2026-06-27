export interface Preference {
  food: string[];
  books: string[];
  games: string[];
}

export interface Persona {
  nombre: string;
  rut: string;
  fechaNacimiento: string;
  ciudad: string;
  preferences: Preference;
}
