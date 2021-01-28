import { Card } from "@blueprintjs/core";
import { Cell, Column, EditableCell, Table } from "@blueprintjs/table";
import React, { useContext, useEffect, useState } from "react";
import { TradeService } from "../services/TradeService";
import { UserContext } from "../services/UserContext";
import { calcTransAmount } from "../utils/calcs";
import { TableTransactionUI} from "./models/TransactionUI";




export function Transactions() {

    const [trans, setTrans] = useState<TableTransactionUI[]>([]);
    const userCtx = useContext(UserContext);


  
      useEffect(() => {
        async function fetchData() {
            const tradeSvc = new TradeService(userCtx.userData.accessToken);
            const data = await tradeSvc.GetOpenTransactions();
            const trUIList:  TableTransactionUI[] = data.map((t) => {
                return {
                    Id: t.ID,
                    Symbol: t.Symbol,
                    Quantity: t.Quantity,
                    Price: t.Price,
                    IsMargin: t.IsMargin,
                    Strike: t.Strike,
                    Expiry: t.Expiry,
                    IsShort: t.IsShort,
                    TransType: t.TransType,
                    Amount: t.Amount,
                    Commission: t.Commission,
                    Fees: t.Fees,
                    IsExercised: t.IsExercised,
                    CreatedAt: t.CreatedAt
    
                }
            })
            setTrans(trUIList)
        }
          fetchData()
        }, [userCtx])

    
        const getTransTypeText = (t: TableTransactionUI) => {
            switch (t.TransType) {
                case 1:
                    return 'Call'
                case 2:
                    return 'Put'
                default:
                    return 'Stock'
            }         
        }


        const getTransSymbolText = (t: TableTransactionUI) => {
            if(t.TransType === 0) {
                return t.Symbol;
            } else {
                const tranDate =  new Date(t.Expiry || new Date());
                const partYear = tranDate.getFullYear().toString().substring(2);
                
                return `${t.Symbol}-${partYear}-${tranDate.getMonth()+1}-${tranDate.getDate()}-${getTransTypeText(t).substr(0,1)}${t.Strike}`;
            }
        }

        const createdCellRenderer = (rowIndex: number) => {
            return <Cell>{new Date(trans[rowIndex].CreatedAt).toLocaleDateString()}</Cell>
        };

        const symbolCellRenderer = (rowindex: number) => {
            return <Cell>{getTransSymbolText(trans[rowindex])}</Cell>
        }

        const qtyCellRenderer = (rowIndex: number) => {
            return <EditableCell style={{textAlign: "right"}} value={trans[rowIndex].Quantity.toString()} />
        };

        const priceCellRenderer = (rowIndex: number) => {
            return <EditableCell style={{textAlign: "right"}} value={trans[rowIndex].Price.toFixed(2)} />
        };

        const commCellRenderer = (rowIndex: number) => {
            return <EditableCell style={{textAlign: "right"}} value={trans[rowIndex].Commission.toFixed(2)} />
        };

        const feeCellRenderer = (rowIndex: number) => {
            return <EditableCell style={{textAlign: "right"}} value={trans[rowIndex].Fees.toFixed(2)} />
        };

        const amountCellRenderer = (rowIndex: number) => {
            return <Cell style={{textAlign: "right"}}>{calcTransAmount(trans[rowIndex]).toFixed(2)}</Cell>
        }

    return(
        <Card>
        <Table numRows={trans.length} key={Date.now().toString()} enableRowHeader={true} enableRowReordering={true}>
            <Column name="Created" cellRenderer={createdCellRenderer} />
            <Column name="Symbol" cellRenderer={symbolCellRenderer} />
            <Column name="Qty" cellRenderer={qtyCellRenderer} />
            <Column name="Price" cellRenderer={priceCellRenderer} />
            <Column name="Commisions" cellRenderer={commCellRenderer} />
            <Column name="Fees" cellRenderer={feeCellRenderer} />
            <Column name="Amount" cellRenderer={amountCellRenderer} />
        </Table>
        </Card>
    );
}