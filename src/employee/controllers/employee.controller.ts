import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { EmployeeService } from '../services/employee.service';
import { EmployeeCreationDto, EmployeeIdDto, FilterEmployeeOptionsDto } from '../dto';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Employee Module')
@Controller('api/employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // GET - /employees
  @Get()
  @ApiOperation({ summary: 'Get all employee details.' })
  @ApiOkResponse({ description: 'Fetch Employee details.' })
  @ApiNoContentResponse({ description: 'No employee Details.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  public async getEmployeeDetailList(@Query() employeeQuery: FilterEmployeeOptionsDto) {
    return this.employeeService.getEmployeeDetailList(employeeQuery);
  }

  // GET - /employees/:employeeId
  @Get(':employeeId')
  @ApiParam({
    example: '63a2e09dba1c67559c88a10e',
    name: 'employeeId',
    description: 'Employee Id',
    type: 'ObjectId',
    required: true,
  })
  @ApiOperation({ summary: 'Get employee detail by id.' })
  @ApiOkResponse({ description: 'Fetch Employee details by id.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiNotFoundResponse({ description: "Employee resource doesn't Exist." })
  public async getEmployeeById(@Param('employeeId') employeeIdDto: EmployeeIdDto) {
    return this.employeeService.getEmployeeById(employeeIdDto.employeeId);
  }

  // POST - /employees
  @Post()
  @ApiParam({
    example: '63a2e09dba1c67559c88a10e',
    name: 'employeeId',
    description: 'Employee Id',
    type: 'ObjectId',
    required: true,
  })
  @ApiBody({
    schema: {
      title: 'Create Employee Post Request Object',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          example: 'Thinura',
        },
        lastName: {
          type: 'string',
          example: 'kumarasinghe',
        },
        email: {
          type: 'string',
          example: 'thinura@gmail.com',
        },
        mobile: {
          type: 'string',
          example: '0123456789',
        },
        gender: {
          enum: ['MALE', 'FEMALE'],
          type: 'string',
          example: 'MALE',
        },
        profilePicture: {
          type: 'string',
          description: 'Profile Picture.',
        },
      },
    },
  })
  @ApiOperation({ summary: 'create a employee.' })
  @ApiOkResponse({ description: 'Resource created successfully!' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiForbiddenResponse({ description: "Employee resource doesn't Exist." })
  public async createEmployee(@Body() employeeCreationDTO: EmployeeCreationDto) {
    return this.employeeService.createEmployee(employeeCreationDTO);
  }

  // POST - /employees/upload/:employeeId
  @Post('upload/:employeeId')
  @ApiParam({
    example: '63a2e09dba1c67559c88a10e',
    name: 'employeeId',
    description: 'Employee Id',
    type: 'ObjectId',
    required: true,
  })
  @ApiOperation({ summary: 'Upload a profile picture.' })
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
    @Param('employeeId') employeeIdDto: EmployeeIdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.employeeService.uploadEmployeeFile(employeeIdDto.employeeId);
  }

  // PUT - /employees/:employeeId
  @Put(':employeeId')
  @ApiParam({
    example: '63a2e09dba1c67559c88a10e',
    name: 'employeeId',
    description: 'Employee Id',
    type: 'ObjectId',
    required: true,
  })
  @ApiBody({
    schema: {
      title: 'Create Employee Post Request Object',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          example: 'Thinura',
        },
        lastName: {
          type: 'string',
          example: 'kumarasinghe',
        },
        email: {
          type: 'string',
          example: 'thinura@gmail.com',
        },
        mobile: {
          type: 'string',
          example: '0123456789',
        },
        gender: {
          enum: ['MALE', 'FEMALE'],
          type: 'string',
          example: 'MALE',
        },
        profilePicture: {
          type: 'string',
          description: 'Profile Picture.',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update a employee.' })
  @ApiOkResponse({ description: 'Resource created updated!' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiForbiddenResponse({ description: "Employee resource doesn't Exist." })
  public async updateEmployeeById(
    @Param('employeeId') employeeIdDto: EmployeeIdDto,
    @Body() employeeUpdateDTO: EmployeeCreationDto,
  ) {
    return this.employeeService.updateEmployeeById(employeeIdDto.employeeId, employeeUpdateDTO);
  }

  // DELETE - /employees/:employeeId
  @Delete(':employeeId')
  @ApiParam({
    example: '63a2e09dba1c67559c88a10e',
    name: 'employeeId',
    description: 'Employee Id',
    type: 'ObjectId',
    required: true,
  })
  @ApiOperation({ summary: 'Delete employee detail by id.' })
  @ApiOkResponse({ description: 'Delete employee information by employee id: ${employeeId}.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiNotFoundResponse({ description: "Employee resource doesn't Exist." })
  public async deleteEmployeeById(@Param('employeeId') employeeIdDto: EmployeeIdDto) {
    return this.employeeService.deleteEmployeeById(employeeIdDto.employeeId);
  }
}
