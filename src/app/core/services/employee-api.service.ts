import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';
import { Employee } from '../../shared/models/employee';
import {
  EmployeeAPI,
  EmployeeResponse,
  EmployeeStatusAPI,
} from '../../shared/models/employee-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  employeeApiUrl = this.configService.configSettings.employeeUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, X-Auth-Token, content-type',
    }),
  };

  mapAPIResponseToEmployeeResponse(employeeAPI: EmployeeAPI): Employee {
    let employee: Employee = {
      id: employeeAPI.id,
      name: employeeAPI.employee_name,
      salary: employeeAPI.employee_salary,
      age: employeeAPI.employee_age,
      profileImage: employeeAPI.profile_image,
    };
    return employee;
  }

  mapAPIResponseToEmployeesResponse(employeeApi: EmployeeAPI[]): Employee[] {
    let employees: Employee[] = employeeApi.map((employee: EmployeeAPI) => {
      return {
        id: employee.id,
        name: employee.employee_name,
        salary: employee.employee_salary,
        age: employee.employee_age,
        profileImage: employee.profile_image,
      };
    });
    return employees;
  }

  getEmployees(): Observable<EmployeeResponse> {
    return this.http
      .get<EmployeeStatusAPI>(
        this.employeeApiUrl + '/employees',
        this.httpOptions
      )
      .pipe(
        map((data: EmployeeStatusAPI) => {
          return {
            status: data.status,
            employees: this.mapAPIResponseToEmployeesResponse(
              data.data as EmployeeAPI[]
            ),
          };
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  /**getEmployee(id: string): Observable<EmployeeResponse> {
    return this.http
      .get<any>(this.employeeApiURL + '/employee/' + id, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('dadta', data);
          return {
            status: data.status,
            employees: this.mapAPIResponseToEmployeeResponse(
              data.data as EmployeeAPI
            ),
          };
        }),
        retry(1),
        catchError(this.handleError)
      );
  }**/

  getEmployee(id: string): Observable<EmployeeResponse> {
    return this.http
      .get<any>(this.employeeApiUrl + '/employee/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.employeeApiUrl + '/create',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.employeeApiUrl + '/employees/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
