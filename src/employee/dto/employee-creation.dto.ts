export enum GenderOptions {
  MALE,
  FEMALE,
}

export interface EmployeeCreation {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: GenderOptions;
  photo: string;
}
