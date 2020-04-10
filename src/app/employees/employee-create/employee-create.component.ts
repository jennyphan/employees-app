import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  employee: Employee = {} as Employee;
  name: FormControl;
  age: FormControl;
  salary: FormControl;

  employeeForm: FormGroup;

  submitted = false;

  constructor(
    private employeeService: EmployeeApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.salary = new FormControl('', Validators.required);
    this.age = new FormControl('', Validators.required);
  }

  clearForm() {
    this.employeeForm.reset();
  }

  createFormGroup() {
    this.employeeForm = new FormGroup({
      name: this.name,
      salary: this.salary,
      age: this.age,
    });
  }

  createEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    this.employee.name = this.employeeForm.get('name').value;
    this.employee.age = this.employeeForm.get('age').value;
    this.employee.salary = this.employeeForm.get('salary').value;

    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        this.submitted = true;
      },
      (error) => console.log(error)
    );
  }
}
