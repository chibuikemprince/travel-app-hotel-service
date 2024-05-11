import { Module } from '@nestjs/common';
import { GoogleAuthService } from './services/auth/google/google.service';
import { Hotel, HotelSchema } from './db/hotel-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './services/bookings/bookings.service';
import { HotelController } from './controllers/bookings/bookings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],

  providers: [GoogleAuthService, HotelService],
  controllers: [HotelController],
})
export class HotelModule {}
