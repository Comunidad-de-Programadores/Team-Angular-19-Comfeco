import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarAuthComponent} from './navbar-auth/navbar-auth.component';
import {NavbarRecoveryPasswordComponent} from './navbar-recovery-password/navbar-recovery-password.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarAuthComponent,
    NavbarRecoveryPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    NavbarAuthComponent,
    NavbarRecoveryPasswordComponent
  ]
})
export class SharedModule {
}
