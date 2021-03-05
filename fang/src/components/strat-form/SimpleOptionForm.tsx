import { Alignment, FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import React, { ChangeEventHandler } from 'react';
import { TradeUI } from '../models/TradeUI';

export type SimpleOptionsProps = {
  trade: TradeUI;
  setTrade: React.Dispatch<React.SetStateAction<TradeUI>>;
};
export function SimpleOptionsForm(props: SimpleOptionsProps) {
  let [transData, setTransData] = React.useState(props.trade.Transactions[0]);

  const jsDateFormatter: IDateFormatProps = {
    // note that the native implementation of Date functions differs between browsers
    formatDate: (date) => date.toLocaleDateString(),
    parseDate: (str) => new Date(str),
    placeholder: 'M/D/YYYY',
  };

  const onQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTransData({ ...transData, Quantity: Number.parseFloat(e.target.value) });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const onPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTransData({ ...transData, Price: Number.parseFloat(e.target.value) });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const onStrikeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTransData({ ...transData, Strike: Number.parseFloat(e.target.value) });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const onExpiryChange = (selectedDate: Date, isUserChange: boolean) => {
    console.log(selectedDate);
    setTransData({ ...transData, Expiry: selectedDate });
    const newTranData = { ...transData, Expiry: selectedDate };
    props.setTrade({ ...props.trade, Transactions: [newTranData] });
  };

  const onShortChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
    setTransData({ ...transData, IsShort: e.target.value === 'on' });
    props.setTrade({ ...props.trade, Transactions: [transData] });
  };

  const isNewLot = () => {
    return transData.Lot.ID === '';
  };

  const getDefaultExpiryDate = () => {
    return transData.Expiry == null ? undefined : new Date(transData.Expiry);
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
          placeholder={'0.00'}
          onChange={onPriceChange}
        />
      </FormGroup>
      <FormGroup label="Strike" labelFor="strike-input" labelInfo="($)">
        <InputGroup
          id="strike-input"
          placeholder="0.00"
          onChange={onStrikeChange}
          defaultValue={transData.Strike.toString()}
          disabled={!isNewLot()}
        />
      </FormGroup>
      <FormGroup label="Expiry">
        <DateInput
          {...jsDateFormatter}
          onChange={onExpiryChange}
          defaultValue={getDefaultExpiryDate()}
          disabled={!isNewLot()}
        />
      </FormGroup>
    </div>
  );
}
