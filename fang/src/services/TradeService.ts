import axios from 'axios';
import { ReadLot } from './models/LotModel';
import { ReadSettings } from './models/SettingsModel';
import { TradeModel } from './models/TradeModel';
import { ReadTransaction } from './models/TransactionModel';

export class TradeService {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.opts = { headers: { Authorization: `Bearer ${accessToken}` } };
  }
  opts: any = {};
  host = process.env.REACT_APP_TRADE_API;
  accessToken = '';

  async CreateTrade(trade: TradeModel): Promise<string> {
    if (this.accessToken !== '') {
      const res = await axios.post(`${this.host}/trade`, trade, this.opts);
      return res.data.ID;
    } else {
      return '';
    }
  }

  async GetOpenTransactions(): Promise<ReadTransaction[]> {
    if (this.accessToken !== '') {
      const res = await axios.get(`${this.host}/transaction`, this.opts);
      return res.data;
    } else {
      return new Promise<ReadTransaction[]>((resolve) => {
        resolve([]);
      });
    }
  }

  async GetOpenLots(): Promise<ReadLot[]> {
    if (this.accessToken !== '') {
      const res = await axios.get(`${this.host}/lot`, this.opts);
      return res.data;
    } else {
      return new Promise<ReadLot[]>((resolve) => {
        resolve([]);
      });
    }
  }

  async GetAccountSettings(): Promise<ReadSettings> {
    if (this.accessToken !== '') {
      const res = await axios.get(`${this.host}/settings`, this.opts);
      return res.data;
    } else {
      return new Promise<ReadSettings>((resolve) => {
        resolve(new ReadSettings());
      });
    }
  }

  async SaveAccountSettings(settings: ReadSettings): Promise<ReadSettings> {
    if (this.accessToken !== '') {
      const res = await axios.post(
        `${this.host}/settings`,
        settings,
        this.opts
      );
      return res.data;
    } else {
      return new Promise<ReadSettings>((resolve) => {
        resolve(new ReadSettings());
      });
    }
  }
}
