import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DataFromApiService} from "../../services/dataFromApiService";
import {UsersCardsInterface} from "../../interfaces/usersCards.Interface";
import {tap, map} from "rxjs/operators";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  getUsersCards$!: Observable<UsersCardsInterface[]>;
  columnTitle: string[] = [
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

  constructor(private dataFromApiService: DataFromApiService) {
  }

  ngOnInit(): void {
    this.getUsersCards$ = this.dataFromApiService.getUsersCards();
  }

}
