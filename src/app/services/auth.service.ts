import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {LoginResponse} from "../interfaces/loginResponse.interface";
import {UserLoginInterface} from "../interfaces/userLogin.interface";
import {AuthorizationInterface} from "../interfaces/authorization.interface";

@Injectable()
export class AuthService {
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private urlToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
  }

  login(userRequestData: UserLoginInterface): Observable<AuthorizationInterface> {
    return this.http.post<LoginResponse>(`https://api.asgk-group.ru/test-auth-only`, userRequestData)
      .pipe(
        switchMap((response: LoginResponse) => {
          if (response.auth_token) {
            this.setAuthToken(response.auth_token);
          }
          return this.authorization(response.auth_token);
        })
      );
  }

  authorization(authToken: string): Observable<AuthorizationInterface> {
    const headers = {
      headers: new HttpHeaders({
        'Content-type': 'application-json',
        Authorization: authToken
      })
    }
    return this.http.get<AuthorizationInterface>(`https://api.asgk-group.ru/v1/authorization`, headers)
      .pipe(
        tap((response: AuthorizationInterface) => {
            if (response.tokens[0].token) {
              this.setAuthorization(true);
              this.setUrlToken(response.tokens[0].token);
              this.urlToken$.next(response.tokens[0].token);
            }
          }
        )
      );
  }

  getTokenUrlBehaviorSub(): BehaviorSubject<string> {
    return this.urlToken$;
  }

  setUrlTokenToBehavior(urlToken: string): void {
    this.urlToken$.next(urlToken);
  }

  getUrlToken() {
    return localStorage.getItem('url-token');
  }

  setUrlToken(urlToken: string) {
    localStorage.setItem('url-token', urlToken);
  }

  getAuthToken() {
    return localStorage.getItem('auth-token')
  }

  setAuthToken(authToken: string): void {
    localStorage.setItem('auth-token', authToken);
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated$.next(false);
    this.router.navigate(['login']);
  }

  setAuthorization(isAuthentication: boolean): void {
    this.isAuthenticated$.next(isAuthentication);
  }

  getIsAuthorization(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }


}
