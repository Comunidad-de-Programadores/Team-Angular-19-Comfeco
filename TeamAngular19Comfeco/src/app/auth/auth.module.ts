import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RecoverPassComponent} from './recover-pass/recover-pass.component';
import { AuthComponent } from './auth.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoverPassComponent, AuthComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
