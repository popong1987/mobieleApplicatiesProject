import {Injectable, OnInit} from '@angular/core';
import {Coin} from '../../datatypes/coin';
import {ApiService} from './api.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {DatabaseService} from './database.service';
import {Favorites} from '../../datatypes/favorites';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class MarketsService{
  #coinsList = this.apiService.getCoins();
  allCoins = this.apiService.getCoins();
  /*favorites: Favorites[] = [];*/
  favorites = [];
  showFavorites: Observable<Coin[]>;
  subscription: Subscription;
  userId = this.authService.getUserUID();


  constructor(private apiService: ApiService, private dbService: DatabaseService,
              private authService: AuthService) {
  }


  getAllCoins(): Observable<Coin[]>{
    return this.#coinsList;
  }

  getCoin(id: string): Observable<Coin[]>{
    return this.getAllCoins().pipe(map(c => c.filter(x => x.id.toString() === id)));
  }

 /* async updateFavorites(id, favorites: Favorites): Promise<void>{
    await this.dbService.updateFavorites(id, favorites);
  }

  async makeFavorites(favorites: string[]){
    await this.dbService.makeFavorites(favorites);
  }

  async getFavorites(): Promise<void>{
    this.subscription = this.dbService.retrieveFavorites(this.userId).subscribe(favorites => this.favorites = favorites);
  }

  setFavorites(): void{
    this.showFavorites = this.#coinsList
      .pipe(
        map<Coin[], Coin[]>(allCoins => allCoins.filter(c => this.favorites.includes(c.id)))
      );
  }*/


}

