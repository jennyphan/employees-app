import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../shared/models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  configUrl = 'assets/config/config.json';
  configSettings: Config;

  load(): Promise<void> {
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: Config) => {
          this.configSettings = <Config>response;
          resolve();
        })
        .catch((response: any) => {
          console.log('error');
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
