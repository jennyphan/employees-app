import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config/config.service';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employees/employee-update/employee-update.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './shared/directives/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    PageNotFoundComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ConfigService,
    AlertService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
