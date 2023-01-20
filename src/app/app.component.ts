import {Component, OnInit} from '@angular/core';

import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dataFromApiService: AuthService) {
  }

  ngOnInit() {
    this.checkOnAuthorization();
    this.checkUrlToken();
  }

  checkUrlToken(): void {
    const urlToken = this.dataFromApiService.getUrlToken();

    if (urlToken) {
      this.dataFromApiService.setUrlTokenToBehavior(urlToken);
    }
  }

  checkOnAuthorization(): void {
    const token = localStorage.getItem('auth-token');

    if (!!token) {
      this.dataFromApiService.setAuthorization(true);
    }
  }
}
