import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';




@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PagesModule { }
