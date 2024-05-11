import { IsEmail, IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  readonly id: string;

  @IsBoolean()
  readonly available: boolean;

  @IsEmail()
  readonly userEmail: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;
}
