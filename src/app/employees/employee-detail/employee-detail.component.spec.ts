import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { EmployeeResponse } from '../../shared/models/employee-response';
import { EmployeeDetailComponent } from './employee-detail.component';

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
class MockEmployeeService {
  employeeApiUrl = 'http://dummy.restapiexample.com/api/v1';
  public getEmployee(id: string): Observable<EmployeeResponse> {
    return of(EMPLOYEE_RESPONSE_OBJECT);
  }
}
describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
