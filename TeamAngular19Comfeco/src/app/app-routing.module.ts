import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {PagesComponent} from './pages/pages.component';

const ROUTES: Routes = [
  // {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '',
    component: AuthComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ] 
  },
  {
    path: 'private',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent }
    ]
  },
  // {path: 'register', component: RegisterComponent},
  // {path: 'recover', component: RegisterComponent},
  {path: '**', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
