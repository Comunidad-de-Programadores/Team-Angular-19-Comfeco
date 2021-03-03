import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfilComponent } from './perfil/perfil.component';
import { SubHomeComponent } from './sub-home/sub-home.component';
import { SubPagesComponent } from './sub-pages.component';

const ROUTES_LAZY: Routes = [
    { path: '',
      component: SubPagesComponent,
      children: [
          { path: '', component: SubHomeComponent },
          { path: 'perfil', component: PerfilComponent }
      ]
    }
];

@NgModule({
imports: [
    RouterModule.forChild(ROUTES_LAZY)
],
exports: [
    RouterModule
]
})
export class SubPagesRoutesModule {}
