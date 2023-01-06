import { Injectable } from '@angular/core';
import {DCA} from '../../datatypes/DCA';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {from, Observable, firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DcaService {
  #dcaList: DCA[] = [];
  dcaObservable: Observable<DCA[]> = from ([]);


  constructor(private authService: AuthService, private dbService: DatabaseService) {
    this.dcaObservable = dbService.retrieveDCATrades();
  }

  getAllDCATrades(): DCA[]{
    return this.#dcaList;
  }

  async deleteDCATrade(id): Promise<void>{
    await this.dbService.deleteDCATrade(id);
  }

  async newDCATrade(pairName: string, startingLevel: number, targetDCAPercentage: number,
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
      currentOrderSize = prevOrderSize - ((prevOrderSize*targetDCAPercentage)/100);
      orderSizesCalculated.push(currentOrderSize);
      prevOrderSize = currentOrderSize;
    }

    for (let i = 0; i < numberOfDCALevels; i++) {
      currentDCALevel = prevDCALevel*(targetQuantityPercentage/100);
      buyingLevelsCalculated.push(currentDCALevel);
      prevDCALevel = currentDCALevel;
    }


    await this.dbService.addDCATrade(

      pairName,
      startingLevel,
      targetDCAPercentage,
      numberOfDCALevels,
      initialOrderSize,
      targetQuantityPercentage,
      dCALevelsCalculated,
      orderSizesCalculated,
      buyingLevelsCalculated

    );
  }

  async updateDCATrade(id,pairName: string, startingLevel: number, targetDCAPercentage: number,
                       numberOfDCALevels: number, initialOrderSize: number, targetQuantityPercentage: number ): Promise<void>{
    let dCATrade: DCA;

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
      currentOrderSize = prevOrderSize - ((prevOrderSize*targetDCAPercentage)/100);
      orderSizesCalculated.push(currentOrderSize);
      prevOrderSize = currentOrderSize;
    }

    for (let i = 0; i < numberOfDCALevels; i++) {
      currentDCALevel = prevDCALevel*(targetQuantityPercentage/100);
      buyingLevelsCalculated.push(currentDCALevel);
      prevDCALevel = currentDCALevel;
    }

    dCATrade={
      pairName,
      startingLevel,
      targetDCAPercentage,
      numberOfDCALevels,
      initialOrderSize,
      targetQuantityPercentage,
      dCALevels: dCALevelsCalculated,
      orderSizes: orderSizesCalculated,
      buyingLevels: buyingLevelsCalculated
    };
    await this.dbService.updateDCATrade(id, dCATrade);
  }

  getNumberOfDCATrades(): number{
    return this.#dcaList.length;
  }

  getDCATrade(id): Promise<DCA> | undefined{
    return firstValueFrom(this.dbService.retrieveOneTrade(id));
  }
}


