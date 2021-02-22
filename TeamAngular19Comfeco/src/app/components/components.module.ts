import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComunidadComponent } from './card-comunidad/card-comunidad.component';
import { ContadorComponent } from './contador/contador.component';



@NgModule({
  declarations: [
    CardComunidadComponent,
    ContadorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComunidadComponent,
    ContadorComponent
  ]
})
export class ComponentsModule { }
