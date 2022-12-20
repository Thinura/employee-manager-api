import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeCreation, FilterEmployeeOptions } from './dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // GET - /employees
  @Get()
  public async getEmployeeDetailList(@Query() employeeQuery: FilterEmployeeOptions) {
    return this.employeeService.getEmployeeDetailList(employeeQuery);
  }

  // GET - /employees/:employeeId
  @Get(':employeeId')
  public async getEmployeeById(@Param('employeeId') employeeId: string) {
    return this.employeeService.getEmployeeById(employeeId);
  }

  // POST - /employees
  @Post()
  public async createEmployee(@Body() employeeCreationDTO: EmployeeCreation) {
    return this.employeeService.createEmployee(employeeCreationDTO);
  }

  // PUT - /employees/:employeeId
  @Put(':employeeId')
  public async updateEmployeeById(
    @Param('employeeId') employeeId: string,
    @Body() employeeUpdateDTO: EmployeeCreation,
  ) {
    return this.employeeService.updateEmployeeById(employeeId, employeeUpdateDTO);
  }

  // DELETE - /employees/:employeeId
  @Delete(':employeeId')
  public async deleteEmployeeById(@Param('employeeId') employeeId: string) {
    return this.employeeService.deleteEmployeeById(employeeId);
  }
}
