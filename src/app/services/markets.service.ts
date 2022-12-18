import {Injectable, OnInit} from '@angular/core';
import {Coin} from '../../datatypes/coin';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DatabaseService} from './database.service';
import {Favorites} from '../../datatypes/favorites';

@Injectable({
  providedIn: 'root'
})


export class MarketsService{
  #coinsList = this.apiService.getCoins();
  favorites = [];
  showFavorites: Observable<Coin[]>;


  constructor(private apiService: ApiService, private dbService: DatabaseService) {
  }


  getAllCoins(): Observable<Coin[]>{
    return this.#coinsList;
  }

  getCoin(id: string): Observable<Coin[]>{
    return this.getAllCoins().pipe(map(c => c.filter(x => x.id.toString() === id)));

}

async updateFavorites(id, favorites: Favorites): Promise<void>{
    await this.dbService.updateFavorites(id, favorites);
}

  async makeFavorites(favorites: string[]){
    await this.dbService.makeFavorites(favorites);
  }

async getFavorites(): Promise<void>{
    this.favorites = await this.dbService.retrieveFavorites();
}

  setFavorites(): void{
    /*this.favorites = this.dbService.retrieveFavorites(id)*/
    this.showFavorites = this.#coinsList
      .pipe(
        map<Coin[], Coin[]>(allCoins => allCoins.filter(c => this.favorites.includes(c.id)))
      );
  }



}

