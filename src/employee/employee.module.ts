import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeService } from './services';
import { EmployeeController } from './controllers';
import { Employee, EmployeeSchema } from './models';
import { EmployeeRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
