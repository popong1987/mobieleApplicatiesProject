import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Coin} from '../../datatypes/coin';
import {map, catchError, retry} from 'rxjs/operators';
import {News} from '../../datatypes/news';
import {CryptoCompareResults} from '../../datatypes/cryptoCompareResults';
import {environment} from '../../environments/environment';
import {Newsfeed} from '../../datatypes/newsfeed';
import {Category} from '../../datatypes/category';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly #baseURLCoinGecko = 'https://api.coingecko.com/api/v3';
  readonly #baseURLCryptoCompare = 'https://min-api.cryptocompare.com/data';
  readonly #baseURLCryptoCompareV2 = 'https://min-api.cryptocompare.com/data/v2';
  readonly #cryptoCompareApiKey = environment.cryptoCompareApiKey;

  constructor(private http: HttpClient) {
  }

  getCoins(): Observable<Coin[]> {
    return this.http
      .get<Coin[]>(
        // eslint-disable-next-line max-len
        `${this.#baseURLCoinGecko}/coins/markets`,
        {
          observe: 'body',
          responseType: 'json',
          params:{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            vs_currency: 'usd',
            order: 'market_cap_desc',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            per_page: 100,
            page: 1,
            sparkline: false,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            price_change_percentage: '24h'
          }
        }
      ).pipe(
      /*  map<Coin, Coin[]>((c, index) => c[index] )*/
        catchError(err => {
          console.error(err);
          return of(undefined);
        }),
        retry(3)
      );

  }



  getNews(): Observable<News[]> {
    return this.http
      .get<CryptoCompareResults<News>>(
        `${this.#baseURLCryptoCompareV2}/news/`,
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

  getFeeds(): Observable<Newsfeed[]>{
    return this.http
      .get<Newsfeed[]>(
        `${this.#baseURLCryptoCompare}/news/feeds`,
        {
          observe: 'body',
          responseType: 'json',
          headers: new HttpHeaders({
            authorization: `Apikey ${this.#cryptoCompareApiKey}`
          }),
        }
      ).pipe(
        catchError(err => {
          console.error(err);
          return of(undefined);
        }),
      );
  }

  getCategories(): Observable<Category[]>{
    return this.http
      .get<Category[]>(
        `${this.#baseURLCryptoCompare}/news/categories`,
        {
          observe: 'body',
          responseType: 'json',
          headers: new HttpHeaders({
            authorization: `Apikey ${this.#cryptoCompareApiKey}`
          }),
        });
  }
}
