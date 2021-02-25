import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComunidadComponent} from './card-comunidad/card-comunidad.component';
import {ContadorComponent} from './contador/contador.component';
import {CarouselSponsorsComponent} from './carousel-sponsors/carousel-sponsors.component';
import {SwiperModule} from "ngx-swiper-wrapper";
import { CarouselContentCreatorsComponent } from './carousel-content-creators/carousel-content-creators.component';


@NgModule({
  declarations: [
    CardComunidadComponent,
    ContadorComponent,
    CarouselSponsorsComponent,
    CarouselContentCreatorsComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    CardComunidadComponent,
    ContadorComponent,
    CarouselSponsorsComponent,
    CarouselContentCreatorsComponent
  ]
})
export class ComponentsModule {
}
