import {Component, OnInit} from '@angular/core';
import {DataFromApiService} from "./services/dataFromApiService";
import {Observable} from "rxjs";
import {ResponseFromApiInterface} from "./interfaces/responseFromApi.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'asgk-group-client';
  loadDataFromApi$!: Observable<ResponseFromApiInterface>;

  constructor(private dataFromApiService: DataFromApiService) {
  }

  ngOnInit() {
    this.loadDataFromApi$ = this.dataFromApiService.loadUsersFromApi();
  }
}
