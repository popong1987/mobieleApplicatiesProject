export interface Coin{
  id: string;
  symbol: string;
  name: string;
  image: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  current_price: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  market_cap: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  market_cap_rank: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fully_diluted_valuation: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  total_volume: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  high_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  low_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_change_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_change_percentage_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  market_cap_change_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  market_cap_change_percentage_24h: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  circulating_supply: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  total_supply: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  max_supply: number;
  ath: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ath_change_percentage: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ath_date: Date;
  atl: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  atl_change_percentage: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  atl_date: Date;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  last_updated: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_change_percentage_24h_in_currency: number;
}
