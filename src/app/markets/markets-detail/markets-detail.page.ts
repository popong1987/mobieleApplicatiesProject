import { Component, OnInit } from '@angular/core';
import {MarketsService} from '../../services/markets.service';
import {Coin} from '../../../datatypes/coin';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';


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


  constructor(private marketService: MarketsService, private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coin = this.marketService.getCoin(id);


  }


  toggleFavorites(id: string): void{

    const index = this.favorites.favorites.indexOf(id);
    if(index !== -1){
      this.favorites.favorites.splice(index, 1);
      this.marketService.favorites = this.favorites;
      this.marketService.updateFavorites(this.favorites.id, this.favorites).then();
    }
    else{
      this.favorites.favorites.push(id);
      this.marketService.favorites = this.favorites;
      this.marketService.updateFavorites(this.favorites.id, this.favorites).then();
    }

  }


  isInFavorites(id: string): boolean{
    const index = this.marketService.favorites.favorites.indexOf(id);

    if(index === -1){
      return false;
    }
    else{
      return true;
    }
  }

}
