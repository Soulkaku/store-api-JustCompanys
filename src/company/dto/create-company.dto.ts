import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Length(3)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(6)
  @IsNotEmpty()
  password: string;
}
