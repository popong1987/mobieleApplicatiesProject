import { Injectable } from '@angular/core';
import {News} from '../../datatypes/news';
import {Newsfeed} from '../../datatypes/newsfeed';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {filter, find, map, mapTo} from 'rxjs/operators';



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

  getFilteredNews(newsFeed: string, category: string): Observable<News[]>{
    if (newsFeed === undefined || newsFeed === 'all' && category === undefined || category === 'allCategories'){
      return this.getAllNews();
    }
    if(newsFeed === undefined || newsFeed === 'all'){
      return this.getAllNews().pipe(
        map((article) => article.filter(n => n.categories.includes(category) === true))
      );
    }
    if(category === undefined || category === 'allCategories'){
      return this.getAllNews().pipe(
        map((article) => article.filter(n => n.source.toString() === newsFeed))
      );
    }
    return this.getAllNews().pipe(
      map((article) => article.filter(n => n.source.toString() === newsFeed && n.categories.includes(category) === true))
    );
  }


}
