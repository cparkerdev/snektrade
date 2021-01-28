import { Card } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { IEXService } from "../services/IEXService";
import { IEXStock } from "../services/models/IEXStock";
import { IEXStockPrice } from "../services/models/IEXStockPrice";
import { numberWithCommas } from "../utils/calcs";

export type HomeProps = { message: string }; /* could also use interface */
export const Home = ({ message }: HomeProps) => {


    const initData: IEXStock[] = [];
    const [mostActives, setMostActives] = useState(initData);
    const [btcPrice, setBTCPrice] = useState(new IEXStockPrice());
    const [ethPrice, setETHPrice] = useState(new IEXStockPrice());

    useEffect(() => {
        async function fetchData() {
          const iexSvc = new IEXService();
          const data = await iexSvc.getMostActive();
          setMostActives(data);
        }

        async function fetchBTC() {
            const iexSvc = new IEXService();
            const data = await iexSvc.getCrypto("btcusd");
            setBTCPrice(data);
        }

        async function fetchETH() {
            const iexSvc = new IEXService();
            const data = await iexSvc.getCrypto("ethusd");
            setETHPrice(data);
        }

          fetchData();
          fetchBTC();
          fetchETH();
    }, [])


    const getChangeStyle = (x: number) => {
        return { color: (x >= 0 ? "#62D96B" : "#FF6E4A")  }
    }


return (
    <div>
        <Card>
            <h5>Most Active</h5>
            <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
            <thead>
            </thead>
            <tbody>
                {mostActives.map(( l, index ) => {
                return (
                <tr>
                    <td>{l.symbol}</td>
                    <td>{l.latestPrice}</td>
                    <td style={getChangeStyle(l.change)}>{l.change}</td>
                    <td style={getChangeStyle(l.change)}>{(l.changePercent*100).toFixed(2)}</td>
                    <td>{l.latestVolume}</td>
                </tr>
                );
                })}
            </tbody>
            </table>
        </Card>
        <Card>
            <h5>Crypto</h5>
            <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td>{btcPrice.symbol}</td>
                    <td>{numberWithCommas(btcPrice.price)}</td>
                </tr>
                <tr>
                    <td>{ethPrice.symbol}</td>
                    <td>{numberWithCommas(ethPrice.price)}</td>
                </tr>
            </tbody>
            </table>
        </Card>
    </div>
);
};