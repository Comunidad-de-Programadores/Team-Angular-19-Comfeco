import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubPagesComponent } from './sub-pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router';
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
  ]
})
export class SubPagesModule { }
