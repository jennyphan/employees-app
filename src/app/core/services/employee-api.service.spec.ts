import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { ConfigService } from '../../config/config.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import {
  EmployeeAPI,
  EmployeeResponse,
} from '../../shared/models/employee-response';

const EMPLOYEE_API: EmployeeAPI = {
  id: '1',
  employee_name: 'testName',
  employee_salary: '50,000',
  employee_age: '22',
  profile_image: '',
};

const EMPLOYEE: Employee = {
  name: 'testName',
  salary: '50,000',
  age: '22',
};

const EMPLOYEE_API_RESPONSE: any = {
  status: 'success',
  data: {
    name: 'testName',
    salary: '50,000',
    age: '22',
  },
};

const EMPLOYEES_API: EmployeeAPI[] = [
  {
    id: '1',
    employee_name: 'testName',
    employee_salary: '50,000',
    employee_age: '22',
    profile_image: '',
  },
  {
    id: '2',
    employee_name: 'testName2',
    employee_salary: '60,000',
    employee_age: '23',
    profile_image: 'image',
  },
];

const EMPLOYEE_RESPONSE_OBJECT: EmployeeResponse = {
  status: 'success',
  employees: {
    id: '1',
    name: 'testName',
    salary: '50,000',
    age: '22',
    profileImage: '',
  },
};

const EMPLOYEES_RESPONSE_OBJECT: EmployeeResponse = {
  status: 'success',
  employees: [
    {
      id: '1',
      name: 'testName',
      salary: '50,000',
      age: '22',
      profileImage: '',
    },
    {
      id: '2',
      name: 'testName2',
      salary: '650,000',
      age: '29',
      profileImage: '',
    },
  ],
};
class MockConfigService {
  configSettings = { employeeUrl: 'http://dummy.restapiexample.com/api/v1' };
}
describe('EmployeeApiService', () => {
  let employeeApiService: EmployeeApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeApiService,
        { provide: ConfigService, useClass: MockConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    employeeApiService = TestBed.inject(EmployeeApiService);
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it('expects service to fetch all employees ', inject(
    [HttpTestingController, EmployeeApiService],
    (httpMock: HttpTestingController, service: EmployeeApiService) => {
      service.employeeApiUrl = 'http://...';
      service
        .getEmployees()
        .subscribe((EMPLOYEES_RESPONSE_OBJECT: EmployeeResponse) => {
          expect(EMPLOYEES_RESPONSE_OBJECT.status).toBe('success');
          // const employees = data.employees as Employee[];
          // expect(employees.length).toBe(24);
        });
      // We set the expectations for the HttpClient mock
      const mockReq = httpMock.expectOne('http://.../employees');
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.responseType).toEqual('json');
      // Then we set the fake data to be returned by the mock
      //mockReq.flush(EMPLOYEES_RESPONSE_OBJECT);
    }
  ));

  it('expects service to fetch an employee ', inject(
    [HttpTestingController, EmployeeApiService],
    (httpMock: HttpTestingController, service: EmployeeApiService) => {
      service.employeeApiUrl = 'http://...';
      service.getEmployee('1').subscribe((data: EmployeeResponse) => {
        expect(data.status).toBe('success');
        // const employees = data.employees as Employee[];
        // expect(employees.length).toBe(24);
      });
      // We set the expectations for the HttpClient mock
      const mockReq = httpMock.expectOne('http://.../employee/1');
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.responseType).toEqual('json');
      // Then we set the fake data to be returned by the mock
      //mockReq.flush(EMPLOYEES_RESPONSE_OBJECT);
    }
  ));
  it('expects service to create an employee ', inject(
    [HttpTestingController, EmployeeApiService],
    (httpMock: HttpTestingController, service: EmployeeApiService) => {
      service.employeeApiUrl = 'http://...';
      service.createEmployee(EMPLOYEE).subscribe((data: any) => {
        expect(data.status).toBe('success');
        // const employees = data.employees as Employee[];
        // expect(employees.length).toBe(24);
      });
      // We set the expectations for the HttpClient mock
      const mockReq = httpMock.expectOne('http://.../create');
      expect(mockReq.request.method).toEqual('POST');
      expect(mockReq.request.responseType).toEqual('json');
      // Then we set the fake data to be returned by the mock
      //mockReq.flush(EMPLOYEES_RESPONSE_OBJECT);
    }
  ));

  it('expects service to UPDATE an employee ', inject(
    [HttpTestingController, EmployeeApiService],
    (httpMock: HttpTestingController, service: EmployeeApiService) => {
      service.employeeApiUrl = 'http://...';
      service.updateEmployee('1', EMPLOYEE).subscribe((data: any) => {
        expect(data.status).toBe('success');
        // const employees = data.employees as Employee[];
        // expect(employees.length).toBe(24);
      });
      // We set the expectations for the HttpClient mock
      const mockReq = httpMock.expectOne('http://.../update/1');
      expect(mockReq.request.method).toEqual('PUT');
      expect(mockReq.request.responseType).toEqual('json');
      // Then we set the fake data to be returned by the mock
      //mockReq.flush(EMPLOYEES_RESPONSE_OBJECT);
    }
  ));

  it('should mapAPIResponseToEmployeeResponse ', () => {
    const employee: Employee = employeeApiService.mapAPIResponseToEmployeeResponse(
      EMPLOYEE_API
    );
    expect(employee.id).toBe(EMPLOYEE_API.id);
    expect(employee.name).toBe(EMPLOYEE_API.employee_name);
    expect(employee.salary).toBe(EMPLOYEE_API.employee_salary);
    expect(employee.age).toBe(EMPLOYEE_API.employee_age);
    expect(employee.profileImage).toBe(EMPLOYEE_API.profile_image);
  });

  it('should mapAPIResponseToEmployeesResponse ', () => {
    const employees: Employee[] = employeeApiService.mapAPIResponseToEmployeesResponse(
      EMPLOYEES_API
    );
    expect(employees.length).toBe(2);
    expect(employees[0].id).toBe(EMPLOYEES_API[0].id);
    expect(employees[0].name).toBe(EMPLOYEES_API[0].employee_name);
    expect(employees[0].salary).toBe(EMPLOYEES_API[0].employee_salary);
    expect(employees[0].age).toBe(EMPLOYEES_API[0].employee_age);
    expect(employees[0].profileImage).toBe(EMPLOYEES_API[0].profile_image);
    expect(employees[1].id).toBe(EMPLOYEES_API[1].id);
    expect(employees[1].name).toBe(EMPLOYEES_API[1].employee_name);
    expect(employees[1].salary).toBe(EMPLOYEES_API[1].employee_salary);
    expect(employees[1].age).toBe(EMPLOYEES_API[1].employee_age);
    expect(employees[1].profileImage).toBe(EMPLOYEES_API[1].profile_image);
  });
});
