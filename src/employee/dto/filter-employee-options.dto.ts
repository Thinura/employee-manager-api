import { IsOptional, IsString } from 'class-validator';

export class FilterEmployeeOptionsDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  searchBy: string;

  @IsOptional()
  @IsString()
  sortBy: string;
}
