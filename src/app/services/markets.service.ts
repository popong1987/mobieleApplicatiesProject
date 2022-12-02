import { Injectable } from '@angular/core';
import {Coin} from '../../datatypes/coin';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class MarketsService {
  #coinsList = this.apiService.getCoins();
  constructor(private apiService: ApiService) { }

  getAllCoins(): Observable<Coin[]>{
    return this.#coinsList;
  }

  getCoin(id: string): Observable<Coin[]>{
    return this.getAllCoins().pipe(map(c => c.filter(x => x.id.toString() === id)));
}
}

