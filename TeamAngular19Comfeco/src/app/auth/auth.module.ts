import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RecoverPassComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
