import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private dataFromApiService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dataFromApiService.getIsAuthorization()
      .pipe(
        tap((value: boolean) => {
            if (value) {
              return true;
            }

            this.router.navigate(['login'])
            return false;
          }
        )
      );
  }
}
