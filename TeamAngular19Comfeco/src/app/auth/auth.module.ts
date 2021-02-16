import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AuthRoutingModule} from './auth-routing.module';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RecoverPassComponent} from './recover-pass/recover-pass.component';
import { AuthComponent } from './auth.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent, 
    RecoverPassComponent
  ],
  imports: [
    CommonModule,
    // AuthRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    ]
})
export class AuthModule {
}
