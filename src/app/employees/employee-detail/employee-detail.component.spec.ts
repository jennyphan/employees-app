import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeResponse } from '../../shared/models/employee-response';
import { EmployeeDetailComponent } from './employee-detail.component';

const EMPLOYEE: Employee = {
  id: '2',
  name: 'testName',
  salary: '50,000',
  age: '22',
  profileImage: '',
};

const EMPLOYEE_RESPONSE_OBJECT: EmployeeResponse = {
  status: 'success',
  employees: EMPLOYEE,
};
class MockEmployeeService {
  employeeApiUrl = 'http://dummy.restapiexample.com/api/v1';
  public getEmployee(id: string): Observable<EmployeeResponse> {
    return of(EMPLOYEE_RESPONSE_OBJECT);
  }
}
describe('EmployeeDetailComponent', () => {
  let employeeDetailComponent: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  let employeeService: EmployeeApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        EmployeeDetailComponent,
        { provide: EmployeeApiService, useClass: MockEmployeeService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    employeeDetailComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(employeeDetailComponent).toBeTruthy();
  });

  it('should call lgetEmployee and return the data for that employee ', async(() => {
    employeeDetailComponent.getEmployee('2');
    fixture.detectChanges();
    expect(employeeDetailComponent.employee).toEqual(EMPLOYEE);
  }));
});
