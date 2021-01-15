import { ButtonGroup, Button, Popover, Position, PopoverInteractionKind, Intent } from "@blueprintjs/core";
import React, { useContext, useEffect, useState } from "react";
import { TradeService } from "../services/TradeService";
import { UserContext } from "../services/UserContext";
import { LotUI } from "./models/LotUI";
import { TradeUI } from "./models/TradeUI";
import { PositionRow } from "./PositionRow";
import { Trade } from "./Trade";
export function PositionList()  {

    const [lots, setLots] = useState<LotUI[]>([])
    const [csp, setCSP] = useState<number>(0);
    const userCtx = useContext(UserContext);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps


    useEffect(() => {
      async function fetchData() {
        const tradeSvc = new TradeService(userCtx.accessToken);
        const data = await tradeSvc.GetOpenLots();
        const lotUIList: LotUI[] = data.map((t) => {
            return {
                ID: t.ID,
                Symbol: t.Symbol,
                Quantity: t.Quantity,
                Price: t.Price,
                IsMargin: t.IsMargin,
                Strike: t.Strike,
                Expiry: t.Expiry,
                IsShort: t.IsShort,
                CreatedAt: t.CreatedAt,
                IsClosed: t.IsClosed,
                Strategy: t.Strategy,
                Obligation: t.Obligation
            }
        })
        console.log('positions loaded...');
        setLots(lotUIList)
        setCSP(lotUIList.filter(x => x.IsShort && x.Strategy === 2).map(x => x.Obligation*100).reduce((x,y) => x+y,0));
    }
        fetchData()
      }, [userCtx])

    const [tradePop, setTradePop] = React.useState(false);  

    const [tradeData, setTradeData] = React.useState(new TradeUI());

    const openTrade = (tradeui: TradeUI) => {
      setTradeData(tradeui);
      setTradePop(true);
    }


    const onTradeCompleteHandle = () => {
      setTradePop(false);
      //fetchData();
    }

    return (
<div className="bp3-dark">
<ButtonGroup>
<Popover        
                interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
                popoverClassName="bp3-popover-content-sizing"
                position={Position.RIGHT}
                isOpen={tradePop}
                onInteraction={(state: React.SetStateAction<boolean>) => setTradePop(state)}
                >
                <Button intent={Intent.PRIMARY} onClick={() => {setTradeData(new TradeUI())}}>Trade</Button>
                <Trade trade={tradeData} onTradeComplete={onTradeCompleteHandle} />
</Popover>
</ButtonGroup>
<label style={{margin: "0px 0px 0px 25px"}}>CSP Reserve: ${csp.toFixed(2)}</label>
<table className="bp3-dark bp3-html-table bp3-html-table-condensed bp3-html-table-bordered bp3-html-table-striped bp3-interactive">
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Type</th>
      <th>Qty</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
        {lots.map(( l, index ) => {
          return (
            <PositionRow l={l} index={index} openTrade={openTrade} />
          );
        })}
  </tbody>
</table>
</div>
    )
}