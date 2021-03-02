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
    navigation: false,
    pagination:
    {
    el:'.swiper-pagination',
    clickable: true
    },
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
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1367: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    loop: true,
    autoplay:{
      delay:3000,
      disableOnInteraction: false
    }
  };

  constructor() {
  }

  ngOnInit(): void {

  }

}
