import { Injectable } from '@angular/core';
import {Coin} from '../../datatypes/coin';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  private coinsList: Observable<Coin[]> = this.apiService.getCoins();
  constructor(public apiService: ApiService) { }

  getCoin(id: string): Observable<Coin>{
    return this.coinsList.pipe(map(c => c.find(x => x.id === id)));
}
}

