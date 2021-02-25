import {Component, Input, OnInit} from '@angular/core';
import {ISponsorsCollection} from "../../class/ISponsorsCollection";
import {SwiperOptions} from "swiper";
import {IContentCreatorsCollection} from "../../class/IContentCreatorsCollection";

@Component({
  selector: 'app-carousel-content-creators',
  templateUrl: './carousel-content-creators.component.html',
  styleUrls: ['./carousel-content-creators.component.css']
})
export class CarouselContentCreatorsComponent implements OnInit {
  @Input() contentCreators: IContentCreatorsCollection[];

  public config: SwiperOptions = {
    a11y: {enabled: true},
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    },
    loop: true
  };

  constructor() {
  }

  ngOnInit(): void {

  }

}
