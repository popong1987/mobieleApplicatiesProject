export interface CryptoCompareResults<T>{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Type: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Message: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Promoted: T[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Data: T[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RateLimit: object;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HasWarning: boolean;
}
