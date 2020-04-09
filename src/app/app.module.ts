import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config/config.service';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    ConfigService,
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
