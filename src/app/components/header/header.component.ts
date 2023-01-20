import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorization$!: Observable<boolean>;

  constructor(private dataFromApiService: AuthService) { }

  ngOnInit(): void {
    this.isAuthorization$ = this.dataFromApiService.getIsAuthorization();
  }

  logout(): void {
    this.dataFromApiService.logout();
  }
}
