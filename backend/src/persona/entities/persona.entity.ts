import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  rut: string;

  @Column()
  nombre: string;

  @Column()
  fechaNacimiento: string;

  @Column()
  ciudad: string;

  @Column('jsonb')
  preferences: { food: string[]; books: string[]; games: string[] };
}
