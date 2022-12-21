import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export enum GenderOptions {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class EmployeeCreationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsMobilePhone('en-SL')
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(GenderOptions)
  gender: GenderOptions;

  @IsOptional()
  @IsString()
  @IsUrl()
  profilePicture: string;
}
