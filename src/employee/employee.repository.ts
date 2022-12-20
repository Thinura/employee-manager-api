import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EmployeeCreation } from './dto';
import { Employee, EmployeeDocument } from './models';

@Injectable()
export class EmployeeRepository {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  public async employeeLists(search?: string, searchBy?: string, sort?: string, sortBy?: string) {
    const value = search || '';
    const SortValue = sort || 'desc';
    const query: any = {};
    const sortQuery: any = {};
    query[searchBy as string] = { $regex: value, $options: 'i' };
    sortQuery[sortBy as string] = SortValue;
    const employeeLists = this.employeeModel.find(query).sort(sortQuery);
    return employeeLists;
  }

  public async createEmployee(data: EmployeeCreation) {
    const employee = await this.employeeModel.create(data);
    return employee;
  }

  public async getEmployeeById(id: string) {
    const employee = this.employeeModel.findOne({ _id: id });
    return employee;
  }

  public async updateEmployeeById(id: string, data: EmployeeCreation) {
    const updateEmployee = this.employeeModel.updateOne({ _id: id }, data, {
      new: true,
    });
    return updateEmployee;
  }

  public async deleteEmployeeById(id: string) {
    const deleteEmployee = this.employeeModel.deleteOne({ _id: id });
    return deleteEmployee;
  }
}
