import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";

import {ResponseFromApiInterface} from "../../interfaces/responseFromApi.interface";
import {UsersDataInterface} from "../../interfaces/usersDataInterface";
import {UsersDataService} from "../../services/users-data.service";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit, AfterViewInit {
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
  dataSource = new MatTableDataSource<UsersDataInterface>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userDataService: UsersDataService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.loadUsersData$ = this.userDataService.loadUsersData();
    this.getUsersData$ = this.userDataService.getUsersData()
      .pipe(
        tap((usersData: UsersDataInterface[]) => {
            this.dataSource.data = usersData
          }
        )
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
