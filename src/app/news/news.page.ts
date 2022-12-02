import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {NewsService} from '../services/news.service';
import {News} from '../../datatypes/news';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  allNews = this.apiService.getNews();
  allFeeds = this.apiService.getFeeds();
  allCategories = this.apiService.getCategories();
  filteredNews: Observable<News[]>;
  selectedFeed= this.allFeeds[0];
  selectedCategory = this.allCategories[0];


  constructor(public apiService: ApiService, public newsService: NewsService) { }



  changeFeed($event: any): void{
    this.selectedFeed = $event.target.value;
    this.setNews();
  }

  changeCategory($event: any): void{
    this.selectedCategory = $event.target.value;
    this.setNews();
  }

  setNews(): void{
    this.filteredNews = this.newsService.getFilteredNews(this.selectedFeed, this.selectedCategory);
  }



  ngOnInit() {
    this.setNews();
  }

}
