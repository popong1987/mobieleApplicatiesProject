import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import SwiperCore, {SwiperOptions} from 'swiper';
import {ActionSheetController, IonicSwiper} from '@ionic/angular';
import {SwiperComponent} from 'swiper/angular';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketsService} from '../services/markets.service';



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
export class MarketsPage implements OnInit{

  config: SwiperOptions = {
    initialSlide: 0

  };

  segments: Segment[] = Object.values(Segment);
  selectedSegment: Segment = Segment.all;
  allCoins = this.apiService.getCoins();
  favorites = [];




  @ViewChild(SwiperComponent) swiper?: SwiperComponent;
  constructor(private actionSheetController: ActionSheetController, private ngZone: NgZone,
              public route: ActivatedRoute, public router: Router, public marketsService: MarketsService,
              private apiService: ApiService) { }

  segmentChanged(): void {
    const i = this.segments.indexOf(this.selectedSegment);
    this.swiper.swiperRef.slideTo(i, 500);

  }

  onActiveIndexChange() {
    this.ngZone.run(() => this.selectedSegment = this.segments[this.swiper.swiperRef.activeIndex]);
  }

  ngOnInit(): void {
    this.marketsService.getFavorites().then();
  }

}
