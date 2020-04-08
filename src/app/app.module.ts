import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, AlertModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
