import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { EmployeeCreationDto } from '../dto';
import { Employee, EmployeeDocument } from '../models';

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
    const employeeLists = await this.employeeModel.find(query).sort(sortQuery);
    return employeeLists;
  }

  public async createEmployee(data: EmployeeCreationDto) {
    const employee = await this.employeeModel.create(data);
    return employee;
  }

  public async findEmployeeByEmail(email: string) {
    const employee = await this.employeeModel.findOne({ email });
    return employee;
  }

  public async findEmployeeById(id: ObjectId) {
    const employee = await this.employeeModel.findById(id);
    return employee;
  }

  public async updateEmployeeById(id: ObjectId, data: EmployeeCreationDto) {
    const updateEmployee = await this.employeeModel.updateOne({ _id: id }, data, {
      new: true,
    });
    return updateEmployee;
  }

  public async deleteEmployeeById(id: ObjectId) {
    const deleteEmployee = await this.employeeModel.deleteOne({ _id: id });
    return deleteEmployee;
  }
}
