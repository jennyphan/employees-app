import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeResponse } from '../../shared/models/employee-response';
import { EmployeeUpdateComponent } from './employee-update.component';

const EMPLOYEE: Employee = {
  name: 'Jenny',
  salary: '20000',
  age: '19',
};

const EMPLOYEE_RESPONSE_OBJECT: EmployeeResponse = {
  status: 'success',
  employees: EMPLOYEE,
};
class MockEmployeeService {
  employeeApiUrl = 'http://dummy.restapiexample.com/api/v1';
  public updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return of(EMPLOYEE);
  }
  public getEmployee(id: string): Observable<EmployeeResponse> {
    return of(EMPLOYEE_RESPONSE_OBJECT);
  }
}
describe('EmployeeUpdateComponent', () => {
  let employeeUpdateComponent: EmployeeUpdateComponent;
  let fixture: ComponentFixture<EmployeeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeUpdateComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        EmployeeUpdateComponent,
        { provide: EmployeeApiService, useClass: MockEmployeeService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateComponent);
    employeeUpdateComponent = fixture.componentInstance;
    employeeUpdateComponent.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(employeeUpdateComponent).toBeTruthy();
  });

  it('should test form validity ', async(() => {
    const employeeForm = employeeUpdateComponent.employeeForm;
    expect(employeeForm.valid).toBeTruthy();

    const nameInput = employeeForm.controls.name;
    nameInput.setValue('');

    expect(employeeForm.valid).toBeFalsy();

    const ageInput = employeeForm.controls.age;
    ageInput.setValue('');
    nameInput.setValue('Jenny');

    expect(employeeForm.valid).toBeFalsy();

    const salaryInput = employeeForm.controls.salary;
    salaryInput.setValue('');
    ageInput.setValue('33');

    expect(employeeForm.valid).toBeFalsy();
  }));

  it('should updateEmployee ', async(() => {
    const employeeForm = employeeUpdateComponent.employeeForm;

    const nameInput = employeeForm.controls.name;
    nameInput.setValue(EMPLOYEE.name);

    const ageInput = employeeForm.controls.age;
    ageInput.setValue(EMPLOYEE.age);

    const salaryInput = employeeForm.controls.salary;
    salaryInput.setValue(EMPLOYEE.salary);

    employeeUpdateComponent.updateEmployee();
    fixture.detectChanges();
    expect(employeeUpdateComponent.employee.name).toBe(EMPLOYEE.name);
    expect(employeeUpdateComponent.employee.age).toBe(EMPLOYEE.age);
    expect(employeeUpdateComponent.employee.salary).toBe(EMPLOYEE.salary);
  }));

  it('should call getEmployee and return the data for that employee ', async(() => {
    employeeUpdateComponent.getEmployee('2');
    fixture.detectChanges();
    expect(employeeUpdateComponent.employee).toEqual(EMPLOYEE);
  }));
});
