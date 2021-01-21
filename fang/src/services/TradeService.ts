import axios from "axios";
import { ReadLot } from "./models/LotModel";
import { ReadSettings } from "./models/SettingsModel";
import { TradeModel } from "./models/TradeModel";
import { ReadTransaction } from "./models/TransactionModel";

export class TradeService {
    constructor(accessToken: string) {
        this.opts = {headers: {'Authorization': `Bearer ${accessToken}`}}
    }
    opts: any = {}
    host = process.env.REACT_APP_TRADE_API;

    async CreateTrade(trade: TradeModel) : Promise<string> {
        
        const res = await axios.post(`${this.host}/trade`, trade, this.opts);
        return res.data.ID;
    }

    async GetOpenTransactions() : Promise<ReadTransaction[]> {
        const res = await axios.get(`${this.host}/transaction`, this.opts);
        return res.data;
    }

    async GetOpenLots() : Promise<ReadLot[]> {
        const res = await axios.get(`${this.host}/lot`, this.opts);
        return res.data;
    }

    async GetAccountSettings() : Promise<ReadSettings> {
        const res = await axios.get(`${this.host}/settings`, this.opts);
        return res.data;
    }

    async SaveAccountSettings(settings: ReadSettings) : Promise<ReadSettings> {
        const res = await axios.post(`${this.host}/settings`, settings, this.opts);
        return res.data;
    }
}

