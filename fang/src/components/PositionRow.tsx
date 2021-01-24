import { Button, Collapse, Menu, MenuDivider, MenuItem, Popover, Position, Pre } from "@blueprintjs/core";
import React from "react";
import { LotUI } from "./models/LotUI";
import { TradeUI } from "./models/TradeUI";
import { TransactionUI } from "./models/TransactionUI";

export type PositionRowProps = { l: LotUI, index: number, openTrade: (trade: TradeUI) => void };

export function PositionRow(props: PositionRowProps) {


    let [isExpanded ] = React.useState(false);
    const trade = new TradeUI();
    trade.Symbol = props.l.Symbol;
    trade.Strategy = props.l.Strategy;
    /*
    const onExpandClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setIsExpanded(!isExpanded);
    }

    const chevronIcon = () => {
        return isExpanded ? "chevron-down" : "chevron-right"
    }

    const notOption = () => {
        return props.l.Strategy === 0 ? true : false
    }
*/
    const getTradeCopy = () => {
        const trade = new TradeUI();
        trade.Strategy = props.l.Strategy;
        trade.Symbol = props.l.Symbol;
        trade.Transactions[0] = lotToTrans(props.l);
        return trade
    }

    const lotToTrans = (l: LotUI) => {
        const tr = new TransactionUI();
        tr.Quantity = l.Quantity;
        tr.Strike = l.Strike;
        tr.TransType = l.Strategy;
        tr.Symbol = l.Symbol;
        tr.Expiry = l.Expiry;
        tr.Lot = l;
        return tr;
    }

    const openBuyTrade = () => {
        const trade = getTradeCopy();
        props.openTrade(trade);
    }

    const openSellTrade = () => {
        const trade = getTradeCopy();
        trade.Transactions[0].IsShort = true;
        props.openTrade(trade);
    }


    const getLotTypeText = (l: LotUI) => {
        switch (l.Strategy) {
            case 1:
                return 'Call'
            case 2:
                return 'Put'
            default:
                return 'Stock'
        }
    }
    
    const getLotSymbolText = (l: LotUI) => {
        if(l.Strategy === 0) {
            return l.Symbol;
        } else {
            const tranDate =  new Date(l.Expiry);
            const partYear = tranDate.getFullYear().toString().substring(2);
            
            
            return `${l.Symbol}-${partYear}-${tranDate.getMonth()+1}-${tranDate.getDate()}-${getLotTypeText(l).substr(0,1)}${l.Strike}`;
        }
    }

    const rowMenu = (
        <Menu>
            <MenuItem text={`Buy${props.l.IsShort ? " Back" : " More"}`} onClick={() => openBuyTrade()}/>
            <MenuItem text={`Sell${props.l.IsShort ? " More" : " Back"}`} onClick={() => openSellTrade()} />
            <MenuDivider />
           {/* <MenuItem icon="th" text="Roll" disabled={notOption()} />
            <MenuItem icon="zoom-to-fit" text="Exercise" disabled={notOption()} />
            <MenuItem icon="zoom-to-fit" text="Close" disabled={notOption()} />
            <MenuDivider />
        */}
           {/* <MenuItem icon="zoom-to-fit" text="Delete" /> */}
        </Menu>
    );





    return(
        <React.Fragment>
        <tr key={props.index}>
          <td>
               {/* <Button  icon={chevronIcon()} minimal={true} small={true} onClick={onExpandClick}></Button>*/}
                <Popover content={rowMenu} position={Position.BOTTOM_RIGHT}  >
                    <Button  minimal={true} small={true} rightIcon="menu" alignText="right" inlist={true} />
                </Popover>
                <span style={{margin: "0px 5px 0px 5px", verticalAlign: "middle"}}>{getLotSymbolText(props.l)}</span>

          </td>
          <td style={{margin: "0px 0px 0px 0px", verticalAlign: "middle", textAlign: "right"}}>{getLotTypeText(props.l)}</td>
          <td style={{margin: "0px 0px 0px 0px", verticalAlign: "middle", textAlign: "right"}}>{`${props.l.IsShort ? '-' : '' }${props.l.Quantity}`}</td>
          <td style={{margin: "0px 0px 0px 0px", verticalAlign: "middle", textAlign: "right"}}>{props.l.Price}</td>
        </tr>
        <tr>
        <td hidden={!isExpanded} colSpan={3}>                
            <Collapse isOpen={isExpanded}>
                <Pre>
                    Dummy text.
                </Pre>
            </Collapse>
        </td> 
        </tr>

        </React.Fragment>
    );
}