import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RecoverPassComponent } from './auth/recover-pass/recover-pass.component';
import {RegisterComponent} from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {PagesComponent} from './pages/pages.component';

const ROUTES: Routes = [
  { path: '',
    component: AuthComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'recovery-password', component: RecoverPassComponent },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
    ] 
  },
  {
    path: 'private',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate:[AuthGuard] }
    ]
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
