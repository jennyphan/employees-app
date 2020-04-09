import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error) {
    // Log to service
    console.log('error', error);
    const router = this.injector.get(Router);
    router.navigate(['/error']);
  }
}
