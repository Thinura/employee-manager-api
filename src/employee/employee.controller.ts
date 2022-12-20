import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { EmployeeService } from './employee.service';
import { EmployeeCreation, FilterEmployeeOptions } from './dto';

@Controller('api/employees')
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

  // POST - /employees/upload/:employeeId
  @Post('upload/:employeeId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, cb: any) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file?.originalname);
          const filename = `${uniqueSuffix}${ext}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  public async uploadEmployeeFile(
    @Param('employeeId') employeeId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.employeeService.uploadEmployeeFile(employeeId);
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
