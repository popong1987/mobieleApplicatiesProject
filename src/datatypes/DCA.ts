export interface DCA{
  id: number;
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
  id: number;
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
