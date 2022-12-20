import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import mongoose, { ClientSession } from 'mongoose';

import { EmployeeRepository } from './employee.repository';
import { EmployeeCreation, FilterEmployeeOptions } from './dto';
import { formatCreationEmployee } from './utils';
import { NotImplementedException } from '@nestjs/common/exceptions';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  public async validateEmployeeById(employeeId: string) {
    const employee = await this.employeeRepository.getEmployeeById(employeeId);
    if (isEmpty(employee)) {
      throw new NotFoundException("Employee resource doesn't Exist.");
    }
    return employee;
  }

  /**
   * GET END POINT - /employees
   * @typedef FilterEmployee
   * @prop {string} search The search keyword
   * @prop {string} sort The sort order
   * @prop {string} searchBy The sort field
   * @prop {string} sortBy The sort by
   *
   */
  public async getEmployeeDetailList(data: FilterEmployeeOptions) {
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
   * @param {string} employeeId employee id
   *
   */
  public async getEmployeeById(employeeId: string) {
    const employee = await this.validateEmployeeById(employeeId);
    return employee;
  }

  /**
   * POST - /employees
   * @typedef EmployeeCreation
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} photo The photo
   *
   */
  public async createEmployee(data: EmployeeCreation) {
    const session: ClientSession = await mongoose.startSession();
    if (isEmpty(data.photo))
      data.photo =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ra_CAN0iKoeVxjSg3Vzf6QHaEK%26pid%3DApi&f=1&ipt=9aa51801a1e54c6b32e02f06e0ba578a176f360ae9747002bdbdf75ef3284d2e&ipo=images';
    session.startTransaction();
    const employee = this.employeeRepository.createEmployee(formatCreationEmployee(data));
    session.commitTransaction();

    session.endSession();
    return { employee };
  }

  public async uploadEmployeeFile(employeeId: string) {
    const employee = await this.validateEmployeeById(employeeId);
    throw new NotImplementedException(
      'upload endpoint not implemented - /employees/upload/:employeeId',
    );
  }

  /**
   * POST - /employees/:employeeId
   * @prop {string} employeeId Employee id
   * @typedef EmployeeCreation
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} photo The photo
   */
  public async updateEmployeeById(employeeId: string, data: EmployeeCreation) {
    const employee = await this.validateEmployeeById(employeeId);

    const session: ClientSession = await mongoose.startSession();

    session.startTransaction();
    if (isEmpty(data.photo))
      data.photo =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ra_CAN0iKoeVxjSg3Vzf6QHaEK%26pid%3DApi&f=1&ipt=9aa51801a1e54c6b32e02f06e0ba578a176f360ae9747002bdbdf75ef3284d2e&ipo=images';

    const updateEmployee = await this.employeeRepository.updateEmployeeById(
      employee.id,
      formatCreationEmployee(data),
    );
    session.commitTransaction();

    session.endSession();
    return updateEmployee;
  }

  /**
   * DELETE - /employees/:employeeId
   * @param {string} employeeId employee id
   *
   */
  public async deleteEmployeeById(employeeId: string) {
    const employee = await this.validateEmployeeById(employeeId);

    const session: ClientSession = await mongoose.startSession();

    session.startTransaction();
    const deleteEmployee = await this.employeeRepository.deleteEmployeeById(employee.id);
    session.commitTransaction();

    session.endSession();
    return deleteEmployee;
  }
}
