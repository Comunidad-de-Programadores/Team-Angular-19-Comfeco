import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {RecoverPassComponent} from './recover-pass/recover-pass.component';

const routes: Routes = [{
  path: '', component: AuthComponent
}, {
  path: 'recovery-password', component: RecoverPassComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
