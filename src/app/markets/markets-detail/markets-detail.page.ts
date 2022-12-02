import { Component, OnInit } from '@angular/core';
import {coins} from '../../../datatypes/dummyData';
import {MarketsService} from '../../services/markets.service';
import {Coin} from '../../../datatypes/coin';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-markets-detail',
  templateUrl: './markets-detail.page.html',
  styleUrls: ['./markets-detail.page.scss'],
})
export class MarketsDetailPage implements OnInit {
  coin: Observable<Coin[]>;
  coinId = '';
  allCoins = coins;

  constructor(private marketService: MarketsService, private  activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.coin = this.marketService.getCoin(id);
    console.log(this.coin);

  }




}
