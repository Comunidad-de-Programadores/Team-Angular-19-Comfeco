import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RecoverPassComponent} from './auth/recover-pass/recover-pass.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {PagesComponent} from './pages/pages.component';
import {ComunidadComponent} from './pages/comunidad/comunidad.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'recovery-password', component: RecoverPassComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]
  },
  {
    path: 'private',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {
        path: 'my-info',
        loadChildren: () => import('../app/pages/my-info/my-info.module').then(m => m.MyInfoModule)
      },
      {path: 'comunidades', component: ComunidadComponent}
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
