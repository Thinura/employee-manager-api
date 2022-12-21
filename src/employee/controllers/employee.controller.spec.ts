import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCreationDto, EmployeeIdDto, FilterEmployeeOptionsDto } from '../dto';
import { EmployeeService } from '../services';
import { EmployeeController } from './employee.controller';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  const employeeLists = [
    {
      firstName: 'Thinura',
      lastName: 'kumarasing',
      email: 'thinu@de1v.co',
      mobile: '0768760449',
      gender: 'MALE',
      profilePicture:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ra_CAN0iKoeVxjSg3Vzf6QHaEK%26pid%3DApi&f=1&ipt=9aa51801a1e54c6b32e02f06e0ba578a176f360ae9747002bdbdf75ef3284d2e&ipo=images',
      id: '63a2e09dba1c67559c88a10e',
    },
  ];

  const mockEmployeeService = {
    getEmployeeDetailList: jest.fn(() => {
      return { employeeLists };
    }),
    createEmployee: jest.fn(() => {
      return { message: 'Resource created successfully!' };
    }),
    getEmployeeById: jest.fn(() => {
      return employeeLists[0];
    }),
    updateEmployeeById: jest.fn(() => {
      return { message: 'Resource successfully updated!' };
    }),
    deleteEmployeeById: jest.fn((dto) => {
      return { message: `Delete employee information by employee id: ${dto}.` };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    })
      .overrideProvider(EmployeeService)
      .useValue(mockEmployeeService)
      .compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmployeeDetailList', () => {
    it('should return employee details', async () => {
      const employeeQuery = {} as FilterEmployeeOptionsDto;
      const expectResponse = { employeeLists };
      expect(await controller.getEmployeeDetailList(employeeQuery)).toEqual(expectResponse);
    });

    it('should be called mockEmployeeService ', async () => {
      const employeeQuery = {} as FilterEmployeeOptionsDto;
      await controller.getEmployeeDetailList(employeeQuery);
      expect(mockEmployeeService.getEmployeeDetailList).toHaveBeenCalled();
    });
  });

  describe('createEmployee', () => {
    it('should return success message ', async () => {
      const fakeUser = employeeLists[0];
      const mockEmployee = {
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        gender: fakeUser.gender,
        mobile: fakeUser.mobile,
        profilePicture: fakeUser.profilePicture,
      } as EmployeeCreationDto;
      const successResponse = { message: 'Resource created successfully!' };
      expect(await controller.createEmployee(mockEmployee)).toEqual(successResponse);
    });

    it('should be called mockEmployeeService ', async () => {
      const fakeUser = employeeLists[0];
      const mockEmployee = {
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        gender: fakeUser.gender,
        mobile: fakeUser.mobile,
        profilePicture: fakeUser.profilePicture,
      } as EmployeeCreationDto;
      await controller.createEmployee(mockEmployee);
      expect(mockEmployeeService.createEmployee).toHaveBeenCalled();
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee ', async () => {
      const fakeUserId = { employeeId: employeeLists[0].id } as unknown as EmployeeIdDto;
      expect(await controller.getEmployeeById(fakeUserId)).toEqual(employeeLists[0]);
    });

    it('should be called mockEmployeeService ', async () => {
      const fakeUserId = { employeeId: employeeLists[0].id } as unknown as EmployeeIdDto;
      await controller.getEmployeeById(fakeUserId);
      expect(mockEmployeeService.getEmployeeById).toHaveBeenCalled();
    });
  });

  describe('updateEmployeeById', () => {
    it('update a employee', async () => {
      const successResponse = { message: 'Resource successfully updated!' };

      const fakeUser = employeeLists[0];
      const fakeUserId = { employeeId: fakeUser.id } as unknown as EmployeeIdDto;
      const mockEmployee = {
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        gender: fakeUser.gender,
        mobile: fakeUser.mobile,
        profilePicture: fakeUser.profilePicture,
      } as EmployeeCreationDto;
      expect(await controller.updateEmployeeById(fakeUserId, mockEmployee)).toEqual(
        successResponse,
      );
    });

    it('should be called mockEmployeeService ', async () => {
      const fakeUser = employeeLists[0];
      const fakeUserId = { employeeId: fakeUser.id } as unknown as EmployeeIdDto;
      const mockEmployee = {
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        gender: fakeUser.gender,
        mobile: fakeUser.mobile,
        profilePicture: fakeUser.profilePicture,
      } as EmployeeCreationDto;
      await controller.updateEmployeeById(fakeUserId, mockEmployee);
      expect(mockEmployeeService.updateEmployeeById).toHaveBeenCalled();
    });
  });

  describe('deleteEmployeeById', () => {
    it('should return success message ', async () => {
      const fakeUserId = { employeeId: employeeLists[0].id } as unknown as EmployeeIdDto;
      const successResponse = {
        message: `Delete employee information by employee id: ${employeeLists[0].id}.`,
      };
      expect(await controller.deleteEmployeeById(fakeUserId)).toEqual(successResponse);
    });

    it('should be called mockEmployeeService ', async () => {
      const fakeUserId = { employeeId: employeeLists[0].id } as unknown as EmployeeIdDto;
      await controller.getEmployeeById(fakeUserId);
      expect(mockEmployeeService.deleteEmployeeById).toHaveBeenCalled();
    });
  });
});
