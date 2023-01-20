import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ResponseFromApiInterface} from "../../interfaces/responseFromApi.interface";
import {UsersDataInterface} from "../../interfaces/usersDataInterface";
import {UsersDataService} from "../../services/users-data.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  loadUsersData$!: Observable<ResponseFromApiInterface>;
  getUsersData$!: Observable<UsersDataInterface[]>;
  columnsToDisplay: string[] = [
    'user_id',
    'first_name',
    'last_name',
    'pat_name',
    'phone',
    'email',
    'birthday',
    'loyalty_level',
    'summ',
    'discount',
  ];

  constructor(private userDataService: UsersDataService) {
  }

  ngOnInit(): void {
    this.loadUsersData$ = this.userDataService.loadUsersData();
    this.getUsersData$ = this.userDataService.getUsersData();
  }

}
