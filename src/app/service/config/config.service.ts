import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConfigService {
    configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
      return this.http.get(this.configUrl);
  }

    // showConfig() {
    //     this.configService.getConfig()
    //         .subscribe(data => this.config = {
    //             heroesUrl: data['url'],
    //             demoFile:  data['demoFile']
    //         });
    // }
}
