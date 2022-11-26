import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DcaService} from '../services/dca.service';

@Component({
  selector: 'app-dca-trade',
  templateUrl: './dca-trade.page.html',
  styleUrls: ['./dca-trade.page.scss'],
})
export class DcaTradePage implements OnInit {

  id: number;
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
              public dcaService: DcaService) { }

  ngOnInit() {
    this.setData();
  }

  setData(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id === null){
      return;
    }

    this.id = Number(id);
    const trade = this.dcaService.getDCATrade(this.id);
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

  handleCreateAndUpdate(): void{
    if(this.id === undefined){
      this.createTrade();
    }else{
      this.updateTrade();
    }
    this.navController.back();
  }

  private createTrade(): void{
    this.dcaService.newDCATrade(this.pairName, this.startingLevel, this.targetDCAPercentage, this.numberOfDCALevels,
      this.initialOrderSize, this.targetQuantityPercentage);
  }

  private updateTrade(): void{
    const dCALevelsCalculated: number [] = [];
    const orderSizesCalculated: number  [] = [];
    const buyingLevelsCalculated: number[] = [];
    let prevOrderSize: number = this.initialOrderSize;
    let currentOrderSize: number;
    let prevDCALevel: number = this.startingLevel;
    let currentDCALevel: number;

    for (let i = 0; i < this.numberOfDCALevels; i++) {
      dCALevelsCalculated.push(i);
    }

    for (let i = 0; i < this.numberOfDCALevels; i++) {
      currentOrderSize = prevOrderSize*(this.targetQuantityPercentage/100);
      orderSizesCalculated.push(currentOrderSize);
      prevOrderSize = currentOrderSize;
    }

    for (let i = 0; i < this.numberOfDCALevels; i++) {
      currentDCALevel = prevDCALevel*(this.targetQuantityPercentage/100);
      buyingLevelsCalculated.push(currentDCALevel);
      prevDCALevel = currentDCALevel;
    }
    this.dcaService.updateDCATrade({
      id: this.id,
      pairName: this.pairName,
      startingLevel: this.startingLevel,
      targetDCAPercentage: this.targetDCAPercentage,
      numberOfDCALevels: this.numberOfDCALevels,
      initialOrderSize: this.initialOrderSize,
      targetQuantityPercentage: this.targetQuantityPercentage,
      dCALevels: this.dCALevels,
      orderSizes: this.orderSizes,
      buyingLevels: this.buyingLevels
    });
  }
}
