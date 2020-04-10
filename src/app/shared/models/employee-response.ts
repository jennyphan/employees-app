import { Employee } from './employee';

export interface EmployeeAPI {
  id?: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

export interface EmployeeStatusAPI {
  status: string;
  data: EmployeeAPI[] | EmployeeAPI;
}

export interface EmployeeResponse {
  status: string;
  employees: Employee[] | Employee;
}
