import { Component, OnInit } from '@angular/core';
import {coins} from '../../../datatypes/dummyData';
import {MarketsService} from '../../services/markets.service';
import {Coin} from '../../../datatypes/coin';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
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
  allCoins: Observable<Coin[]> = this.marketService.getAllCoins();
  favorites = this.marketService.favorites;
  showFavorites: Observable<Coin[]>;


  constructor(private marketService: MarketsService, private  activatedRoute: ActivatedRoute,
  /*private dbService: DatabaseService*/) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coin = this.marketService.getCoin(id);


  }


  toggleFavorites(id: string): void{
    // TODO: Hier een functie in de MarketService nodig die de favorieten persistent maakt.

    const index = this.favorites.indexOf(id);
    if(index !== -1){
      this.favorites.splice(index, 1);
      this.marketService.favorites = this.favorites;


    }
    else{
      this.favorites.push(id);
      this.marketService.favorites = this.favorites;
    }
    // TODO: Je verhuist onderstaande methode beter naar de MarketService, gekoppeld aan het persist maken van de
    // favorieten.
    this.setFavorites();
  }


  isInFavorites(id: string): boolean{
    const index = this.marketService.favorites.indexOf(id);

    if(index === -1){
      return false;
    }
    else{
      return true;
    }
  }

  setFavorites(): void{
    this.marketService.showFavorites = this.allCoins
      .pipe(
        map<Coin[], Coin[]>(allCoins => allCoins.filter(c => this.favorites.includes(c.id)))
      );
  }
}
