import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeCreateComponent } from './employee-create.component';

const EMPLOYEE: Employee = {
  name: 'Jenny',
  salary: '20000',
  age: '19',
};
class MockEmployeeService {
  employeeApiUrl = 'http://dummy.restapiexample.com/api/v1';
  public createEmployee(employee: Employee): Observable<Employee> {
    return of(EMPLOYEE);
  }
}
describe('EmployeeCreateComponent', () => {
  let employeeCreateComponent: EmployeeCreateComponent;
  let fixture: ComponentFixture<EmployeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCreateComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        EmployeeCreateComponent,
        { provide: EmployeeApiService, useClass: MockEmployeeService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    employeeCreateComponent = fixture.componentInstance;
    employeeCreateComponent.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(employeeCreateComponent).toBeTruthy();
  });

  it('should test form validity ', async(() => {
    const employeeForm = employeeCreateComponent.employeeForm;
    expect(employeeForm.valid).toBeFalsy();

    const nameInput = employeeForm.controls.name;
    nameInput.setValue('John Peter');

    expect(employeeForm.valid).toBeFalsy();

    const ageInput = employeeForm.controls.age;
    ageInput.setValue('25');

    expect(employeeForm.valid).toBeFalsy();

    const salaryInput = employeeForm.controls.salary;
    salaryInput.setValue('30000');

    expect(employeeForm.valid).toBeTruthy();
  }));

  it('should createEmployee ', async(() => {
    const employeeForm = employeeCreateComponent.employeeForm;

    const nameInput = employeeForm.controls.name;
    nameInput.setValue(EMPLOYEE.name);

    const ageInput = employeeForm.controls.age;
    ageInput.setValue(EMPLOYEE.age);

    const salaryInput = employeeForm.controls.salary;
    salaryInput.setValue(EMPLOYEE.salary);

    employeeCreateComponent.createEmployee();
    expect(employeeCreateComponent.employee.name).toBe(EMPLOYEE.name);
    expect(employeeCreateComponent.employee.age).toBe(EMPLOYEE.age);
    expect(employeeCreateComponent.employee.salary).toBe(EMPLOYEE.salary);
  }));
});
