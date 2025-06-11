import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Length(3)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(6)
  @IsNotEmpty()
  password: string;
}
