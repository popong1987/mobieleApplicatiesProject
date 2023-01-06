import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NewsService} from '../services/news.service';
import {News} from '../../datatypes/news';
import {Observable} from 'rxjs';
import {Browser} from '@capacitor/browser';
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';
import { Network } from '@capacitor/network';
import {PluginListenerHandle} from '@capacitor/core';



@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {

  allFeeds = this.apiService.getFeeds();
  allCategories = this.apiService.getCategories();
  filteredNews: Observable<News[]>;
  selectedFeed= this.allFeeds[0];
  selectedCategory = this.allCategories[0];
  networkListener: PluginListenerHandle;
  status: boolean;


  constructor(public apiService: ApiService, public newsService: NewsService,
              private socialSharing: SocialSharing, private ngZone: NgZone) { }



  changeFeed($event: any): void{
    this.setNews();
  }

  changeCategory($event: any): void{
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


  async ngOnInit() {
    this.setNews();
    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() =>{
        this.changeStatus(status);
      });
    });

    const status = await Network.getStatus();
    console.log('Network status:', this.status);
    this.changeStatus(status);
    console.log('Network status:', this.status);
  }

  changeStatus(status) {
    this.status = status?.connected;
  }

  ngOnDestroy() {
    if(this.networkListener){
      this.networkListener.remove();
    }
  }
}
