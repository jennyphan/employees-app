import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { EmployeeResponse } from '../../shared/models/employee-response';
import { EmployeeListComponent } from './employee-list.component';

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
class MockEmployeeService {
  employeeApiUrl = 'http://dummy.restapiexample.com/api/v1';
  public getEmployees(): Observable<EmployeeResponse> {
    return of(EMPLOYEES_RESPONSE_OBJECT);
  }
}

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [HttpClientTestingModule, NgxPaginationModule],
      providers: [
        EmployeeListComponent,
        { provide: EmployeeApiService, useClass: MockEmployeeService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
