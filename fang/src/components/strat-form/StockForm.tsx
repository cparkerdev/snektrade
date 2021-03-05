import { Alignment, FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import React, { ChangeEventHandler } from 'react';
import { TradeUI } from '../models/TradeUI';

export type StockFormProps = {
  trade: TradeUI;
  setTrade: React.Dispatch<React.SetStateAction<TradeUI>>;
};
export function StockForm(props: StockFormProps) {
  let [transData, setTransData] = React.useState(props.trade.Transactions[0]);

  const onQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTransData({ ...transData, Quantity: Number.parseFloat(e.target.value) });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const onPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTransData({ ...transData, Price: Number.parseFloat(e.target.value) });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const onShortChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
    setTransData({ ...transData, IsShort: e.target.value === 'on' });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  return (
    <div>
      <Switch
        labelElement={'Short'}
        defaultChecked={transData.IsShort}
        onChange={onShortChange}
        inline={true}
        alignIndicator={Alignment.RIGHT}
      />
      <FormGroup label="Quantity" labelFor="quantity-input" labelInfo="">
        <InputGroup
          id="quantity-input"
          placeholder="Enter Quantity"
          defaultValue={transData.Quantity.toString()}
          onChange={onQuantityChange}
        />
      </FormGroup>
      <FormGroup label="Price" labelFor="price-input" labelInfo="($)">
        <InputGroup
          id="price-input"
          placeholder="0.00"
          onChange={onPriceChange}
        />
      </FormGroup>
    </div>
  );
}
