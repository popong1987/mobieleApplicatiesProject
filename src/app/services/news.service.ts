import { Injectable } from '@angular/core';
import {News} from '../../datatypes/news';
import {Newsfeed} from '../../datatypes/newsfeed';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {filter, find, mapTo} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {


  #newsList = this.apiService.getNews();
  constructor(public apiService: ApiService) { }

  /*private static newsMatchesNewsFilter(news: News, newsFeed: Newsfeed): boolean{
    if(news.source === newsFeed.name){
      return true;
    }
  }*/

  getAllNews(): Observable<News[]>{
    return this.#newsList;
  }

  getFilteredNews(newsFeed: Newsfeed): Observable<News[]>{
    return this.getAllNews().pipe(
      filter(  (article: News) => article.source === newsFeed.name)
    );
  }
}
