import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDetailRoutingModule } from './employee-detail-routing.module';
import { EmployeeDetailComponent } from './employee-detail.component';


@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    EmployeeDetailRoutingModule
  ]
})
export class EmployeeDetailModule { }
