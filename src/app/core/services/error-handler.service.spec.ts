import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandlerService } from './error-handler.service';

class MockRouter {
  navigate(url: string) {
    return url;
  }
}
describe('ErrorHandlerService', () => {
  let injector: TestBed;
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ErrorHandlerService,
        { provide: Router, useClass: MockRouter },
      ],
    });

    injector = getTestBed();
    service = injector.get(ErrorHandlerService);
  });

  it('should navigate to the error page ', inject(
    [Router],
    (router: Router) => {
      const spy = spyOn(router, 'navigate');
      service.handleError('error');
      const url = spy.calls.first().args[0];
      expect(url[0]).toBe('/error');
    }
  ));
});
