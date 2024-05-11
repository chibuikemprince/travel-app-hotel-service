import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HotelService } from '../../services/bookings/bookings.service';
import { CreateHotelDto } from 'src/hotels/dto/Hotel-data';
import { JwtAuthGuard } from 'src/hotels/guards/auth/auth.guard';
import { Request } from 'express';

interface MyRequest extends Request {
  email: string;
}
type CreateHotelDtoWithoutEmailAndAvailable = Omit<
  CreateHotelDto,
  'userEmail' | 'available'
>;
@UseGuards(JwtAuthGuard)
@Controller('hotels')
export class HotelController {
  constructor(private readonly HotelService: HotelService) {}

  @Post('create')
  async create(
    @Body() myHotel: CreateHotelDtoWithoutEmailAndAvailable,
    @Req() req: MyRequest,
  ) {
    try {
      //start snd end date must be in the future
      if (new Date(myHotel.startDate) < new Date()) {
        throw new HttpException(
          {
            message: 'Start date must be in the future',
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // end date must be greater than start date
      if (new Date(myHotel.startDate) >= new Date(myHotel.endDate)) {
        throw new HttpException(
          {
            message: 'End date must be greater than start date',
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const Hotel: CreateHotelDto = {
        ...myHotel,
        userEmail: req.email,
        available: true,
      };
      await this.HotelService.create(Hotel);
      return {
        message: 'Hotel created successfully',
        data: Hotel,
        status: 'success',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: 'error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getall')
  async findAll() {
    try {
      const Hotels = await this.HotelService.findAll();
      return {
        message: 'Hotels retrieved successfully',
        data: Hotels,
        status: 'success',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: 'error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('user')
  async findByUserEmail(@Req() req: MyRequest) {
    try {
      const Hotels = await this.HotelService.findByUserEmail(req.email);
      return {
        message: 'Hotels retrieved successfully',
        data: Hotels,
        status: 'success',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: 'error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
