import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Config } from '../shared/models/config';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
  configUrl = 'assets/config/config.json';
  static configSettings: Config;

  load() {
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: Config) => {
          ConfigService.configSettings = <Config>response;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }

  handleError(error) {
    let errorMessage = '';
    console.log('error', error);
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
