import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ForbiddenException, NotImplementedException } from '@nestjs/common/exceptions';

import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeCreationDto, FilterEmployeeOptionsDto } from '../dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  public async validateEmployeeById(employeeId: ObjectId) {
    const employee = await this.employeeRepository.findEmployeeById(employeeId);
    if (isEmpty(employee)) {
      throw new NotFoundException("Employee resource doesn't Exist.");
    }
    return employee;
  }

  public async validateEmployeeAvailabilityByEmail(email: string) {
    const employee = await this.employeeRepository.findEmployeeByEmail(email);
    if (!isEmpty(employee)) {
      throw new ForbiddenException('Employee resource exist by same email.');
    }
    return employee;
  }

  /**
   * GET END POINT - /employees
   * @typedef FilterEmployeeOptionsDto
   * @prop {string} search The search keyword
   * @prop {string} sort The sort order
   * @prop {string} searchBy The sort field
   * @prop {string} sortBy The sort by
   *
   */
  public async getEmployeeDetailList(data: FilterEmployeeOptionsDto) {
    const { search, sort, searchBy, sortBy } = data;
    const employeeLists = await this.employeeRepository.employeeLists(
      search,
      searchBy,
      sort,
      sortBy,
    );
    if (isEmpty(employeeLists)) {
      throw new HttpException({}, HttpStatus.NO_CONTENT);
    }

    return { employeeLists };
  }

  /**
   * GET - /employees/:employeeId
   * @param {ObjectId} employeeId employee id
   *
   */
  public async getEmployeeById(employeeId: ObjectId) {
    const employee = await this.validateEmployeeById(employeeId);
    return { employee };
  }

  /**
   * POST - /employees
   * @typedef EmployeeCreationDto
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} profilePicture The profile picture
   *
   */
  public async createEmployee(data: EmployeeCreationDto) {
    await this.validateEmployeeAvailabilityByEmail(data.email);
    if (isEmpty(data.profilePicture)) {
      // Assign default profile picture
      data.profilePicture =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ra_CAN0iKoeVxjSg3Vzf6QHaEK%26pid%3DApi&f=1&ipt=9aa51801a1e54c6b32e02f06e0ba578a176f360ae9747002bdbdf75ef3284d2e&ipo=images';
    }
    await this.employeeRepository.createEmployee(data);

    // Return the success response
    return { message: 'Resource created successfully!' };
  }

  public async uploadEmployeeFile(employeeId: ObjectId) {
    const employee = await this.validateEmployeeById(employeeId);
    throw new NotImplementedException(
      'upload endpoint not implemented - /employees/upload/:employeeId',
    );
  }

  /**
   * POST - /employees/:employeeId
   * @prop {ObjectId} employeeId Employee id
   * @typedef EmployeeCreationDto
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} profilePicture The profile picture
   */
  public async updateEmployeeById(employeeId: ObjectId, data: EmployeeCreationDto) {
    const employee = await this.validateEmployeeById(employeeId);

    if (isEmpty(data.profilePicture)) {
      // Assign default profile picture
      data.profilePicture =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ra_CAN0iKoeVxjSg3Vzf6QHaEK%26pid%3DApi&f=1&ipt=9aa51801a1e54c6b32e02f06e0ba578a176f360ae9747002bdbdf75ef3284d2e&ipo=images';
    }

    await this.employeeRepository.updateEmployeeById(employee.id, data);
    // Return the success response
    return { message: 'Resource successfully updated!' };
  }

  /**
   * DELETE - /employees/:employeeId
   * @param {ObjectId} employeeId employee id
   *
   */
  public async deleteEmployeeById(employeeId: ObjectId) {
    const employee = await this.validateEmployeeById(employeeId);

    await this.employeeRepository.deleteEmployeeById(employee.id);

    return { message: `Delete employee information by employee id: ${employeeId}.` };
  }
}
