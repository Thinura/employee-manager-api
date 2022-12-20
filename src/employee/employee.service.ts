import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { isEmpty } from 'lodash';

import { EmployeeRepository } from './employee.repository';
import { EmployeeCreation, FilterEmployeeOptions } from './dto';
import { formatCreationEmployee } from './utils';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository, private session: ClientSession) {}

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
    try {
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * GET - /employees/:employeeId
   * @param {string} employeeId employee id
   *
   */
  public async getEmployeeById(employeeId: string) {
    try {
      const employee = await this.validateEmployeeById(employeeId);
      return employee;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
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
    try {
      const employee = this.employeeRepository.createEmployee(formatCreationEmployee(data));
      this.session.commitTransaction();
      return employee;
    } catch (error) {
      console.log(error);
      this.session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      this.session.endSession();
    }
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
    try {
      const employee = await this.validateEmployeeById(employeeId);

      const updateEmployee = await this.employeeRepository.updateEmployeeById(
        employee.id,
        formatCreationEmployee(data),
      );
      this.session.commitTransaction();
      return updateEmployee;
    } catch (error) {
      console.log(error);
      this.session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      this.session.endSession();
    }
  }

  /**
   * DELETE - /employees/:employeeId
   * @param {string} employeeId employee id
   *
   */
  public async deleteEmployeeById(employeeId: string) {
    try {
      const employee = await this.validateEmployeeById(employeeId);

      const deleteEmployee = await this.employeeRepository.deleteEmployeeById(employee.id);
      this.session.commitTransaction();
      return deleteEmployee;
    } catch (error) {
      this.session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      this.session.endSession();
    }
  }
}
