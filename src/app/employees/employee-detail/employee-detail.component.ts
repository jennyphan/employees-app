import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeResponse } from '../../shared/models/employee-response';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = {} as Employee;
  employeeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeApiService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployee(this.employeeId);
  }

  getEmployee(id: string): Subscription {
    return this.employeeService
      .getEmployee(id)
      .subscribe((data: EmployeeResponse) => {
        this.employee = data.employees as Employee;
      });
  }
}
