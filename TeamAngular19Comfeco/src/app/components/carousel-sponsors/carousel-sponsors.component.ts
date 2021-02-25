import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ISponsorsCollection} from '../../class/ISponsorsCollection';
import {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-carousel-sponsors',
  templateUrl: './carousel-sponsors.component.html',
  styleUrls: ['./carousel-sponsors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselSponsorsComponent implements OnInit {
  @Input() sponsors: ISponsorsCollection[];

  public config: SwiperOptions = {
    a11y: {enabled: true},
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
      }
    },
    loop: true
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
