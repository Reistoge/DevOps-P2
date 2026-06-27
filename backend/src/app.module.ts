import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';
import { PersonaEntity } from './persona/entities/persona.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USER', 'devops_user'),
        password: config.get('DB_PASSWORD', 'secret_password_123'),
        database: config.get('DB_NAME', 'devops_db'),
        entities: [PersonaEntity],
        synchronize: true,
      }),
    }),
    PersonaModule,
  ],
})
export class AppModule { }
