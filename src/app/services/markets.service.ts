import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Coin} from '../../datatypes/coin';
import {ApiService} from './api.service';
import {firstValueFrom, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {DatabaseService} from './database.service';
import {Favorites} from '../../datatypes/favorites';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class MarketsService implements OnDestroy{
  #coinsList = this.apiService.getCoins();
  allCoins = this.apiService.getCoins();
  favorites: Favorites;
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

  async updateFavorites(id, favorites: Favorites): Promise<void>{
    await this.dbService.updateFavorites(id, favorites);
  }

  async makeFavorites(favorites: Favorites){
    await this.dbService.makeFavorites(favorites);
  }

  async getFavorites(): Promise<void>{
    this.subscription = this.dbService.retrieveFavorites().subscribe(favorites => {
      if (favorites) {
        this.favorites = favorites;
      } else {
        this.favorites = {
          favorites: [],
          userId: this.authService.getUserUID(),
        };
        this.makeFavorites(this.favorites);
      }
      console.log(this.favorites);
      this.setFavorites();
    });
  }

  setFavorites(): void{
    this.showFavorites = this.#coinsList
      .pipe(
        map<Coin[], Coin[]>(allCoins => allCoins.filter(c => this.favorites.favorites.includes(c.id)))
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

