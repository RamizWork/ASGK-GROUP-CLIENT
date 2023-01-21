import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";

import {ResponseFromApiInterface} from "../interfaces/responseFromApi.interface";
import {UsersDataInterface} from "../interfaces/usersDataInterface";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {PushMessageInterface} from "../interfaces/pushMessage.interface";

@Injectable()
export class UsersDataService {
  private usersData$: BehaviorSubject<UsersDataInterface[]> = new BehaviorSubject<UsersDataInterface[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  loadUsersData(): Observable<ResponseFromApiInterface> {
    return this.auth.getTokenUrlBehaviorSub().asObservable().pipe(
      filter((urlToken) => Boolean(urlToken)),
      switchMap((urlToken) => {
        return this.http.get<ResponseFromApiInterface>(`${environment.apiUrl}/v1/${urlToken}/passes?search&limit=100&offset=0`)
          .pipe(
            tap((response: ResponseFromApiInterface) => {
                this.usersData$.next(response.passes);
              }
            )
          );
      })
    )
  }

  sendPushMessage(pushMessage: PushMessageInterface): Observable<any> {
    const urlToken = this.auth.getUrlToken();

    return this.http.post(`${environment.apiUrl}/v1/${urlToken}/message/push`,{...pushMessage});
  }

  getUsersData(): Observable<UsersDataInterface[]> {
    return this.usersData$.asObservable();
  }
}
