import { Injectable } from '@angular/core';
import {DCA} from '../../datatypes/DCA';

@Injectable({
  providedIn: 'root'
})
export class DcaService {
  #dcaList: DCA[] = [];
  #id = 0;
  constructor() { }

  getAllDCATrades(): DCA[]{
    return this.#dcaList;
  }

  deleteDCATrade(id: number): void{
    this.#dcaList = this.#dcaList.filter(d => d.id !== id);
  }

  newDCATrade(pairName: string, startingLevel: number, targetDCAPercentage: number,
              numberOfDCALevels: number, initialOrderSize: number, targetQuantityPercentage: number ){
    const dCALevelsCalculated: number [] = [];
    const orderSizesCalculated: number  [] = [];
    const buyingLevelsCalculated: number[] = [];
    let prevOrderSize: number = initialOrderSize;
    let currentOrderSize: number;
    let prevDCALevel: number = startingLevel;
    let currentDCALevel: number;

    for (let i = 0; i < numberOfDCALevels; i++) {
      dCALevelsCalculated.push(i);
    }

    for (let i = 0; i < numberOfDCALevels; i++) {
      currentOrderSize = prevOrderSize*(targetQuantityPercentage/100);
      orderSizesCalculated.push(currentOrderSize);
      prevOrderSize = currentOrderSize;
    }

    for (let i = 0; i < numberOfDCALevels; i++) {
      currentDCALevel = prevDCALevel*(targetQuantityPercentage/100);
      buyingLevelsCalculated.push(currentDCALevel);
      prevDCALevel = currentDCALevel;
    }


    this.#dcaList.push({
      id: this.#id,
      pairName,
      startingLevel,
      targetDCAPercentage,
      numberOfDCALevels,
      initialOrderSize,
      targetQuantityPercentage,
      dCALevels: dCALevelsCalculated,
      orderSizes: orderSizesCalculated,
      buyingLevels: buyingLevelsCalculated

    });
    this.#id++;
  }

  updateDCATrade(updatedDCATrade: DCA): void{
    const trade = this.#dcaList.find(t => t.id === updatedDCATrade.id);
    if(trade === undefined){
      console.error('Trying to update a nonexistent trade');
      return;
    }
  }

  getNumberOfDCATrades(): number{
    return this.#dcaList.length;
  }

  getDCATrade(id: number): DCA | undefined{
    return this.#dcaList.find(t => t.id === id);
  }
}


