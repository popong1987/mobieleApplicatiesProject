import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  allNews = this.apiService.getNews();
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    console.log(this.allNews);
  }

}
