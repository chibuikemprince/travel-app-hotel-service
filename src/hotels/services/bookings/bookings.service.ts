import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../../db/hotel-schema';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateHotelDto } from 'src/hotels/dto/hotel-data';

@Injectable()
export class HotelService implements OnModuleInit {
  private client;

  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: 'user_notifications',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async create(Hotel: CreateHotelDto) {
    try {
      const createdHotel = new this.HotelModel(Hotel);
      await createdHotel.save();

      await this.client.emit('hotel_available', {
        id: Hotel.id,
        userEmail: Hotel.userEmail,
        type: 'hotel',
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Hotel[]> {
    try {
      return this.HotelModel.find().exec();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByUserEmail(userEmail: string): Promise<Hotel[]> {
    try {
      return this.HotelModel.find({ userEmail }).exec();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
      console.error('Error details:', error.details);
      console.error('Stack trace:', error.stack);
    }
  }
}
