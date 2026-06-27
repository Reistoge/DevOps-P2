import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { PersonaEntity } from './entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaEntity])],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
