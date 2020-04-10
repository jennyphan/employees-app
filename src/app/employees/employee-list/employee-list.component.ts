import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeResponse } from '../../shared/models/employee-response';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [] as Employee[];

  page: number = 1;
  itemsPerPage: number = 10;

  constructor(public employeeApiService: EmployeeApiService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees() {
    return this.employeeApiService
      .getEmployees()
      .subscribe((data: EmployeeResponse) => {
        this.employees = data.employees as Employee[];
      });
  }
}
