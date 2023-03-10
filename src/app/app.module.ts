import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {AuthService} from "./services/auth.service";
import {MainPageComponent} from './components/main-page/main-page.component';
import {HeaderComponent} from './components/header/header.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthGuard} from "./auth.guard";
import {UsersDataService} from "./services/users-data.service";
import { ModalPushMessageComponent } from './components/modal-push-message/modal-push-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    HeaderComponent,
    ModalPushMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    UsersDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
