import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  allNews = this.apiService.getNews();
  allFeeds = this.apiService.getFeeds();
  selectedFeed = this.allFeeds[0];

  constructor(public apiService: ApiService) { }

  changeFeed($event: any): void{
    this.selectedFeed = $event.target.value;
  }

  ngOnInit() {
    console.log(this.allNews);
  }

}
