import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import {TokenResponseInterface} from "../interfaces/tokenResponse.interface";
import {UserLoginInterface} from "../interfaces/userLogin.interface";
import {environment} from "../../environments/environment";
import {ResponseFromApiInterface} from "../interfaces/responseFromApi.interface";
import {UsersCardsInterface} from "../interfaces/usersCards.Interface";

@Injectable()
export class DataFromApiService {
  usersCards$: BehaviorSubject<UsersCardsInterface[]> = new BehaviorSubject<UsersCardsInterface[]>([]);

  constructor(private http: HttpClient) {
  }

  getAuthKeyFromApi(userRequestData: UserLoginInterface): Observable<TokenResponseInterface> {
    return this.http.post<TokenResponseInterface>(`https://api.asgk-group.ru/test-auth-only`, userRequestData)
      .pipe(
        tap((response: TokenResponseInterface) => {
            const token: string = response.auth_token;
            console.log(typeof token);
            localStorage.setItem('token', token);
          }
        )
      );
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  getToken(): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        'Content-type': 'application-json',
        Authorization: '9f6befe40b796f854ef7f8ceed08869d'
      })
    }
    return this.http.get(` https://api.asgk-group.ru/v1/authorization`, headers);
  }

  loadUsersFromApi(): Observable<ResponseFromApiInterface> {
    let headers = {
      headers: new HttpHeaders({
        'Content-type': 'application-json',
        Authorization: environment.keyAuthorization
      })
    }
    return this.http.get<ResponseFromApiInterface>(`https://api.asgk-group.ru/v1/${environment.token}/passes?search&limit=50&offset=0`, headers)
      .pipe(
        tap((response: ResponseFromApiInterface) => {
            this.usersCards$.next(response.passes);
          }
        )
      );
  }

  getUsersCards(): Observable<UsersCardsInterface[]> {
    return this.usersCards$.asObservable();
  }
}
