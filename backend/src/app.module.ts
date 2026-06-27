import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersonaModule,
  ],
})
export class AppModule { }
