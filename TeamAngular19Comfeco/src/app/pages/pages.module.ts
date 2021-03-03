import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { SubPagesModule } from './sub-pages/sub-pages.module';




@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ComunidadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    SubPagesModule
  ]
})
export class PagesModule { }
