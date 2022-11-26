import { Component, OnInit } from '@angular/core';
import {coins} from '../../datatypes/dummyData';

@Component({
  selector: 'app-markets-detail',
  templateUrl: './markets-detail.page.html',
  styleUrls: ['./markets-detail.page.scss'],
})
export class MarketsDetailPage implements OnInit {

  allCoins = coins;
  constructor() { }

  ngOnInit() {
  }


}
