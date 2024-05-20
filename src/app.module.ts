import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { ConsultationsModule } from './appointments/consultation.module';
import { PatientsModule } from './patients/patients.module';
import { DiseasesModule } from './diseases/diseases.module';
import { PracticesModule } from './practices/practices.module';
import { EntriesModule } from './entries/entries.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database') || 'patients',

        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PatientsModule,
    DoctorsModule,
    ConsultationsModule,
    MedicalHistoryModule,
    DiseasesModule,
    PracticesModule,
    EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
