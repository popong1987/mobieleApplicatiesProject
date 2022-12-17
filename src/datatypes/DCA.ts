export interface DCA{
  id?: string;
  pairName: string;
  startingLevel: number;
  targetDCAPercentage: number;
  numberOfDCALevels: number;
  initialOrderSize: number;
  targetQuantityPercentage: number;
  dCALevels: number[];
  orderSizes: number[];
  buyingLevels: number[];
}

export class DCAC{
  id?: string;
  pairName: string;
  startingLevel: number;
  targetDCAPercentage: number;
  numberOfDCALevels: number;
  initialOrderSize: number;
  targetQuantityPercentage: number;
  dCALevels: number[];
  orderSizes: number[];
  buyingLevels: number[];

  constructor(obj: DCA) {
    Object.assign(this, obj);
  }
}
