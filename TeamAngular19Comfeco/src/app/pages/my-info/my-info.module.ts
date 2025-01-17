import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyInfoComponent} from './my-info.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from '@angular/router';
import {MyInfoRoutingModule} from './my-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';


@NgModule({
  declarations: [
    MyInfoComponent,
    EditProfileComponent,
    ProfileComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class MyInfoModule {
}
