import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DcaService} from '../services/dca.service';
import {DatabaseService} from '../services/database.service';


@Component({
  selector: 'app-dca-trade',
  templateUrl: './dca-trade.page.html',
  styleUrls: ['./dca-trade.page.scss'],
})
export class DcaTradePage implements OnInit {

  id: string;
  pairName: string;
  startingLevel: number;
  targetDCAPercentage: number;
  numberOfDCALevels: number;
  initialOrderSize: number;
  targetQuantityPercentage: number;
  dCALevels: number[] = [];
  orderSizes: number[] = [];
  buyingLevels: number[] = [];

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public dcaService: DcaService, public databaseService: DatabaseService) { }

  ngOnInit() {
    this.setData().then();
  }

   async setData(): Promise<void>{
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.id === null){
      return;
    }


    const trade = await this.dcaService.getDCATrade(this.id);
    this.pairName= trade.pairName;
    this.startingLevel = trade.startingLevel;
    this.targetDCAPercentage = trade.targetDCAPercentage;
    this.numberOfDCALevels = trade.numberOfDCALevels;
    this.initialOrderSize = trade.initialOrderSize;
    this.targetQuantityPercentage = trade.targetQuantityPercentage;
    this.dCALevels = trade.dCALevels;
    this.orderSizes = trade.orderSizes;
    this.buyingLevels = trade.buyingLevels;
  }

  async handleCreateAndUpdate(): Promise<void>{
    if(!this.id){
      await this.createTrade();
    }else{
      await this.updateTrade(this.id);
    }
    this.navController.back();
  }

  async createTrade(): Promise<void>{
    await this.dcaService.newDCATrade(this.pairName, this.startingLevel, this.targetDCAPercentage, this.numberOfDCALevels,
      this.initialOrderSize, this.targetQuantityPercentage);
  }

  async updateTrade(id): Promise<void>{
    await this.dcaService.updateDCATrade(this.id, this.pairName, this.startingLevel, this.targetDCAPercentage, this.numberOfDCALevels,
      this.initialOrderSize, this.targetQuantityPercentage)
  }

}
