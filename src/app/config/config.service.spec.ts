import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [],
    }).compileComponents();
  }));

  let originalTimeout;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
  });
  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  // beforeEach(() => {
  //  configService = TestBed.inject(ConfigService);
  //});

  /**it('should create', () => {
    configService.load().then(() => {
      console.log('here2');
      expect(configService.configSettings.employeeUrl).toBe('success');
    });
  });**/

  // !!!!!!!
  /*it('should return a resolved Promise', inject(
    [ConfigService],
    async (service: ConfigService) => {
      await service.load().then(() => {
        console.log('here2');
        expect(service.configSettings.employeeUrl).toBe('success');
      
      });
    }
  ));**/
});
