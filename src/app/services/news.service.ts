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


  getAllNews(): Observable<News[]>{
    return this.#newsList;
  }

  getFilteredNews(newsFeed: string, category: string): Observable<News[]>{
    return this.getAllNews().pipe(
      map((articles) => articles.filter((n) => this.#isValidNewsArticle(newsFeed, category, n)))
    );
  }

  #isValidNewsArticle(newsFeed: string, category: string, article: News): boolean {
    const allNewsFeeds = newsFeed === undefined || newsFeed === 'all';
    const allCategories = category === undefined || category === 'allCategories';
    const hasValidNewsFeed = article.source === newsFeed;
    const hasValidCategory = article.categories.includes(category);

    if (!allNewsFeeds && allCategories) {
      return hasValidNewsFeed;
    }

    if (!allCategories && allNewsFeeds) {
      return hasValidCategory;
    }

    if (!allCategories && !allNewsFeeds) {
      return hasValidNewsFeed && hasValidCategory;
    }
    return true;
  }


}
