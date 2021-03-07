import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyInfoComponent} from './my-info.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';

const ROUTES_LAZY: Routes = [
  {
    path: '',
    component: MyInfoComponent,
    children: [
      {path: '', component: ProfileComponent},
      {path: 'edit-profile', component: EditProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_LAZY)],
  exports: [RouterModule]
})
export class MyInfoRoutingModule {
}
