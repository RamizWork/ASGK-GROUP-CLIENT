import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {DataFromApiService} from "../../services/dataFromApiService";
import {catchError, tap} from "rxjs/operators";
import {UserLoginInterface} from "../../interfaces/userLogin.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  userResponse$!: Observable<any>;

  constructor(private dataFromApiService: DataFromApiService, private router: Router) {
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
    this.userResponse$ = this.dataFromApiService.getAuthKeyFromApi(userData).pipe(
      tap(() => {
        this.router.navigate(['main']);
      }),
      catchError(error => of())
    )
  }

}
