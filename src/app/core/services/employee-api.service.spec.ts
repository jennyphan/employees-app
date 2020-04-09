import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { ConfigService } from '../../config/config.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { EmployeeResponse } from '../../shared/models/employee-response';

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
});
