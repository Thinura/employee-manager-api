import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../repositories';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockEmployeeRepository = {
    getEmployeeDetailList: jest.fn(() => {
      return {};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, EmployeeRepository],
    })
      .overrideProvider(EmployeeRepository)
      .useValue(mockEmployeeRepository)
      .compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
