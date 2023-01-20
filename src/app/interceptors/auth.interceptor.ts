import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

import {AuthService} from "../services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dataFromApiService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.dataFromApiService.getAuthToken();

    if (token) {
      req = req.clone({
          setHeaders: {
            Authorization: token
          }
        }
      )
    } else {
      this.router.navigate(['login']);
    }
    return next.handle(req);
  }

}
