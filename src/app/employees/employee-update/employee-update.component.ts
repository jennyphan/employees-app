import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeResponse } from '../../shared/models/employee-response';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent implements OnInit, OnDestroy {
  employee: Employee = {} as Employee;
  name: FormControl;
  age: FormControl;
  salary: FormControl;
  employeeId: string = '';

  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeApiService,
    private route: ActivatedRoute,
    protected alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    this.alertService.clearMessage();
  }
  ngOnInit(): void {
    this.alertService.clearMessage();
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployee(this.employeeId);
  }

  createFormControls(): void {
    this.name = new FormControl(this.employee.name, Validators.required);
    this.salary = new FormControl(this.employee.salary, Validators.required);
    this.age = new FormControl(this.employee.age, Validators.required);
  }

  createFormGroup(): void {
    this.employeeForm = new FormGroup({
      name: this.name,
      salary: this.salary,
      age: this.age,
    });
  }

  getEmployee(id: string): Subscription {
    return this.employeeService
      .getEmployee(id)
      .subscribe((data: EmployeeResponse) => {
        this.employee = data.employees as Employee;
        this.createFormControls();
        this.createFormGroup();
      });
  }

  updateEmployee(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    this.employee.name = this.employeeForm.get('name').value;
    this.employee.age = this.employeeForm.get('age').value;
    this.employee.salary = this.employeeForm.get('salary').value;

    this.employeeService
      .updateEmployee(this.employeeId, this.employee)
      .subscribe(
        (data) => {
          this.alertService.success('Update Successful');
        },
        (error) => {
          this.alertService.error('There was an error updating the employee');
        }
      );
  }
}
