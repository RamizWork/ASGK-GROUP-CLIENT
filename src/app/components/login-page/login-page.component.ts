import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMPTY, Observable, of} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {UserLoginInterface} from "../../interfaces/userLogin.interface";
import {Router} from "@angular/router";
import {AuthorizationInterface} from "../../interfaces/authorization.interface";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  login$!: Observable<AuthorizationInterface>;

  constructor(private dataFromApiService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit(): void {
    const userData: UserLoginInterface = {
      login: this.form.value.login,
      password: this.form.value.password
    }
    this.login$ = this.dataFromApiService.login(userData).pipe(
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError(error => {
        return EMPTY;
      })
    )
  }

}
