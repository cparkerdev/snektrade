import axios from "axios";
import { IEXStock } from "./models/IEXStock";
import { IEXStockPrice } from "./models/IEXStockPrice";

export class IEXService {
    apiHost = process.env.REACT_APP_IEX_API;
    apiToken = process.env.REACT_APP_IEX_TOKEN;
    
    async getMostActive() : Promise<IEXStock[]> {
        const res = await axios.get(`${this.apiHost}/stock/market/list/mostactive?token=${this.apiToken}`)
        const d: IEXStock[] = res.data as IEXStock[];
        return d;
    }

    async getCrypto(symbol: string): Promise<IEXStockPrice> {
        const res = await axios.get(`${this.apiHost}/crypto/${symbol}/price?token=${this.apiToken}`)
        const d: IEXStockPrice = res.data as IEXStockPrice;
        return d;
    }


}