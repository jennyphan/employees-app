import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { Employee } from '../../shared/models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = {} as Employee;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeApiService: EmployeeApiService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }

  getEmployee(id: string) {
    this.employee = { name: 'Peter', salary: '20000', age: '25' };

    /**return this.employeeApiService
      .getEmployee(id)
      .subscribe((data: EmployeeResponse) => {
        this.employee = data.employees as Employee;
      });**/
  }
}
