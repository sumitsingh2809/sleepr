import { AUTH_SERVICE, DatabaseModule, LoggerModule, PAYMENTS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import Joi from 'joi';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_URI: Joi.string().required(),
        AUTH_TCP_HOST: Joi.string().required(),
        AUTH_TCP_PORT: Joi.number().required(),
        PAYMENTS_TCP_HOST: Joi.string().required(),
        PAYMENTS_TCP_PORT: Joi.number().required(),
      }),
      envFilePath: ['apps/reservations/.env'],
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('AUTH_TCP_HOST'), port: configService.get('AUTH_TCP_PORT') },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('PAYMENTS_TCP_HOST'), port: configService.get('PAYMENTS_TCP_PORT') },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
