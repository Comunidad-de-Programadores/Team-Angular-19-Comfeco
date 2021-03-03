import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SubPagesRoutesModule } from './sup-pages.routes';

import { SubPagesComponent } from './sub-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SubHomeComponent } from './sub-home/sub-home.component';



@NgModule({
  declarations: [
    SubPagesComponent,
    PerfilComponent,
    SubHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SubPagesRoutesModule
  ],
  exports: [
    SubPagesComponent,
    PerfilComponent,
    SubHomeComponent
  ]
})
export class SubPagesModule { }
