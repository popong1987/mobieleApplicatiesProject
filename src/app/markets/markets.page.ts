import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import SwiperCore, {SwiperOptions} from 'swiper';
import {ActionSheetController, IonicSwiper} from '@ionic/angular';
import {SwiperComponent} from 'swiper/angular';
import {coins} from '../../datatypes/dummyData';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';


SwiperCore.use([IonicSwiper]);

enum Segment {
  all = 'All',
  favorites = 'Favorites',
}

@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})
export class MarketsPage{

  config: SwiperOptions = {
    initialSlide: 0
  };

  segments: Segment[] = Object.values(Segment);
  selectedSegment: Segment = Segment.all;
  allCoins = this.apiService.getCoins();



  @ViewChild(SwiperComponent) swiper?: SwiperComponent;
  constructor(private actionSheetController: ActionSheetController, private ngZone: NgZone,
              public apiService: ApiService, public route: ActivatedRoute, public router: Router) { }

  segmentChanged(): void {
    const i = this.segments.indexOf(this.selectedSegment);
    this.swiper.swiperRef.slideTo(i, 500);
    console.log(this.allCoins);
  }

  onActiveIndexChange() {
    this.ngZone.run(() => this.selectedSegment = this.segments[this.swiper.swiperRef.activeIndex]);
  }



}
