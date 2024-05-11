import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotels/hotel.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB), HotelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
