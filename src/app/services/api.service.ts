import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Coin} from '../../datatypes/coin';
import {map, catchError} from 'rxjs/operators';
import {News} from '../../datatypes/news';
import {CryptoCompareResults} from '../../datatypes/cryptoCompareResults';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly #baseURLCoinGecko = 'https://api.coingecko.com/api/v3';
  readonly #baseURLCryptoCompare = 'https://min-api.cryptocompare.com/data/v2';
  readonly #cryptoCompareApiKey = environment.cryptoCompareApiKey;

  constructor(private http: HttpClient) {
  }

  getCoins(): Observable<Coin[]> {
    return this.http
      .get<Coin>(
        // eslint-disable-next-line max-len
        `${this.#baseURLCoinGecko}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
        {
          observe: 'body',
          responseType: 'json',
          /*params:{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            vs_currency: 'usd',
            order: 'market_cap_desc',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            per_page: 100,
            page: 1,
            sparkline: false,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            price_change_percentage: '24h'
          }*/
        }
      ).pipe(
        catchError(err => {
          console.error(err);
          return of(undefined);
        }),
      );

  }

  getNews(): Observable<News[]> {
    return this.http
      .get<CryptoCompareResults<News>>(
        `${this.#baseURLCryptoCompare}/news/`,
        {
          observe: 'body',
          responseType: 'json',
          headers: new HttpHeaders({
            authorization: `Apikey ${this.#cryptoCompareApiKey}`
          }),
        }
      ).pipe(
        map<CryptoCompareResults<News>, News[]>(c => c.Data)
      );
  }
}
