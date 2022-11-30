import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {NewsService} from '../services/news.service';
import {Newsfeed} from '../../datatypes/newsfeed';
import {map} from "rxjs/operators";
import {News} from "../../datatypes/news";


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  allNews = this.apiService.getNews();
  allFeeds = this.apiService.getFeeds();
  selectedFeed= this.allFeeds[0];

  constructor(public apiService: ApiService, public newsService: NewsService) { }

  changeFeed($event: any): void{
    this.selectedFeed = $event.target.value;
  }

  ngOnInit() {
    console.log('log allnews:' + this.allNews);
  }

}
