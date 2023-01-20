import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPageComponent} from "./components/login-page/login-page.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', component: MainPageComponent,  canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
