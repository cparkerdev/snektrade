import axios from 'axios';
import { IEXStock } from './models/IEXStock';
import { IEXStockEarnings } from './models/IEXStockEarnings';
import { IEXStockPrice } from './models/IEXStockPrice';

export class IEXService {
  apiHost = process.env.REACT_APP_IEX_API;
  apiToken = process.env.REACT_APP_IEX_TOKEN;

  async getMostActive(): Promise<IEXStock[]> {
    const res = await axios.get(
      `${this.apiHost}/stock/market/list/mostactive?token=${this.apiToken}`
    );
    const d: IEXStock[] = res.data as IEXStock[];
    return d;
  }

  async getGainers(): Promise<IEXStock[]> {
    const res = await axios.get(
      `${this.apiHost}/stock/market/list/gainers?token=${this.apiToken}`
    );
    const d: IEXStock[] = res.data as IEXStock[];
    return d;
  }

  async getLosers(): Promise<IEXStock[]> {
    const res = await axios.get(
      `${this.apiHost}/stock/market/list/losers?token=${this.apiToken}`
    );
    const d: IEXStock[] = res.data as IEXStock[];
    return d;
  }

  async getTodaysEarnings(): Promise<Record<string, IEXStockEarnings[]>> {
    const res = await axios.get(
      `${this.apiHost}/stock/market/today-earnings?token=${this.apiToken}`
    );
    const d: Record<string, IEXStockEarnings[]> = res.data as Record<
      string,
      IEXStockEarnings[]
    >;
    return d;
  }

  async getCrypto(symbol: string): Promise<IEXStockPrice> {
    const res = await axios.get(
      `${this.apiHost}/crypto/${symbol}/losers?token=${this.apiToken}`
    );
    const d: IEXStockPrice = res.data as IEXStockPrice;
    return d;
  }
}
