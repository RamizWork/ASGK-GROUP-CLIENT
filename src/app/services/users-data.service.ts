import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ResponseFromApiInterface} from "../interfaces/responseFromApi.interface";
import {filter, switchMap, tap} from "rxjs/operators";
import {UsersDataInterface} from "../interfaces/usersDataInterface";
import {AuthService} from "./auth.service";

@Injectable()
export class UsersDataService {
  private usersData$: BehaviorSubject<UsersDataInterface[]> = new BehaviorSubject<UsersDataInterface[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  loadUsersData(): Observable<ResponseFromApiInterface> {
    return this.auth.getTokenUrlBehaviorSub().asObservable().pipe(
      filter((urlToken) => Boolean(urlToken)),

      switchMap((urlToken) => {
        return this.http.get<ResponseFromApiInterface>(`https://api.asgk-group.ru/v1/${urlToken}/passes?search&limit=100&offset=0`)
          .pipe(
            tap((response: ResponseFromApiInterface) => {
                this.usersData$.next(response.passes);
              }
            )
          );
      })
    )
  }

  getUsersData(): Observable<UsersDataInterface[]> {
    return this.usersData$.asObservable();
  }
}
