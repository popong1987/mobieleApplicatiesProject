import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {NewsService} from '../services/news.service';
import {News} from '../../datatypes/news';
import {Observable} from 'rxjs';
import {Browser} from '@capacitor/browser';
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';



@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  allFeeds = this.apiService.getFeeds();
  allCategories = this.apiService.getCategories();
  filteredNews: Observable<News[]>;
  selectedFeed= this.allFeeds[0];
  selectedCategory = this.allCategories[0];


  constructor(public apiService: ApiService, public newsService: NewsService,
              private socialSharing: SocialSharing) { }



  changeFeed($event: any): void{
    // this.selectedFeed = $event.target.value;
    this.setNews();
  }

  changeCategory($event: any): void{
    // this.selectedCategory = $event.target.value;
    this.setNews();
  }

  setNews(): void{
    this.filteredNews = this.newsService.getFilteredNews(this.selectedFeed, this.selectedCategory);
  }

  async openNews(newsUrl: string): Promise<void>{
    await Browser.open({ url: newsUrl });
  }

  shareOnTwitter(message: string,  url: string){
    this.socialSharing.shareViaTwitter(message, null, url)
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }


  ngOnInit() {
    this.setNews();
  }

}
