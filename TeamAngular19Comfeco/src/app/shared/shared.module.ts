import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarAuthComponent} from './navbar-auth/navbar-auth.component';
import {NavbarRecoveryPasswordComponent} from './navbar-recovery-password/navbar-recovery-password.component';
import { RouterModule } from '@angular/router';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarAuthComponent,
    NavbarRecoveryPasswordComponent,
    NavbarUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarAuthComponent,
    NavbarRecoveryPasswordComponent,
    NavbarUserComponent
  ]
})
export class SharedModule {
}
