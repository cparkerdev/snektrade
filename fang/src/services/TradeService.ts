import axios from "axios";
import { ReadLot } from "./models/LotModel";
import { TradeModel } from "./models/TradeModel";
import { ReadTransaction } from "./models/TransactionModel";

export class TradeService {
    constructor(accessToken: string) {
        this.opts = {headers: {'Authorization': `Bearer ${accessToken}`}}
    }
    opts: any = {}
    host = process.env.REACT_APP_TRADE_API;
  
    // 'http://localhost:8080'

    async CreateTrade(trade: TradeModel) : Promise<string> {
        
        const res = await axios.post(`${this.host}/trade`, trade, this.opts);
        return res.data.ID;
    }

    async GetOpenTransactions() : Promise<ReadTransaction[]> {
        const res = await axios.get(`${this.host}/transaction`, this.opts);
        return res.data;
    }

    async GetOpenLots() : Promise<ReadLot[]> {
        console.log(this.opts);
        const res = await axios.get(`${this.host}/lot`, this.opts);
        return res.data;
    }
}

