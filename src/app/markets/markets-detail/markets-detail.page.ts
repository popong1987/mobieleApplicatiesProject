import { Component, OnInit } from '@angular/core';
import {coins} from '../../../datatypes/dummyData';
import {MarketsService} from '../../services/markets.service';
import {Coin} from '../../../datatypes/coin';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
/*import {DatabaseService} from "../../services/database.service";
import {Favorites} from "../../../datatypes/favorites";*/

@Component({
  selector: 'app-markets-detail',
  templateUrl: './markets-detail.page.html',
  styleUrls: ['./markets-detail.page.scss'],
})
export class MarketsDetailPage implements OnInit {
  coin: Observable<Coin[]>;
  coinId = '';
  allCoins = this.marketService.getAllCoins();
  favorites= this.marketService.favorites;
  showFavorites = Observable<Coin[]>;


  constructor(private marketService: MarketsService, private  activatedRoute: ActivatedRoute,
  /*private dbService: DatabaseService*/) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coin = this.marketService.getCoin(id);


  }


  toggleFavorites(id: string): void{
    const index = this.favorites.indexOf(id);

    if(index !== -1){
      this.favorites.splice(index, 1);
      this.marketService.favorites = this.favorites;
    }
    else{
      this.favorites.push(id);
      this.marketService.favorites = this.favorites;
    }
  }


  isInFavorites(id: string): boolean{
    const index = this.marketService.favorites.indexOf(id);
    console.log(index);

    if(index === -1){
      return false;
    }
    else{
      return true;
    }
  }

  setFavorites(): void{
    for (const id in this.marketService.favorites) {
      this.marketService.showFavorites = this.allCoins.pipe(map(coin => coin.id === id));
    }

  }






}
