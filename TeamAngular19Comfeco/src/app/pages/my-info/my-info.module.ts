import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyInfoComponent} from './my-info.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from '@angular/router';
import {MyInfoRoutingModule} from './my-info-routing.module';


@NgModule({
  declarations: [
    MyInfoComponent,
    EditProfileComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MyInfoRoutingModule

  ]
})
export class MyInfoModule {
}
