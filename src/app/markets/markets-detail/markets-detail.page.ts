import { Component, OnInit } from '@angular/core';
import {coins} from '../../../datatypes/dummyData';
import {MarketsService} from '../../services/markets.service';
import {Coin} from '../../../datatypes/coin';
import {ActivatedRoute} from '@angular/router';
import {Observable} from "rxjs";

@Component({
  selector: 'app-markets-detail',
  templateUrl: './markets-detail.page.html',
  styleUrls: ['./markets-detail.page.scss'],
})
export class MarketsDetailPage implements OnInit {
  coin: Coin;
  coinId = '';
  allCoins = coins;

  constructor(private marketService: MarketsService, private  activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.coinId = this.activatedRoute.snapshot.paramMap.get('id');
   /* this.coin = this.getCoin();*/
  }

  private getCoin(): Observable<Coin>{
   return this.marketService.getCoin(this.coinId);
  }


}
