import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EmployeeIdDto {
  @IsMongoId()
  @IsString()
  employeeId: ObjectId;
}
