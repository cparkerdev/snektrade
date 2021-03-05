import React, { ChangeEventHandler, SyntheticEvent, useContext } from 'react';
import {
  FormGroup,
  InputGroup,
  Button,
  ButtonGroup,
  Intent,
  MenuItem,
} from '@blueprintjs/core';
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import * as Strats from '../services/strategies';
import { TradeUI } from './models/TradeUI';
import { StockForm } from './strat-form/StockForm';
import { SimpleOptionsForm } from './strat-form/SimpleOptionForm';
import { TradeService } from '../services/TradeService';
import { TransactionUI } from './models/TransactionUI';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import { TradeModel } from '../services/models/TradeModel';
import { CreateTransaction } from '../services/models/TransactionModel';
import { LotUI } from './models/LotUI';
import { ReadLot } from '../services/models/LotModel';
import { UserContext } from '../services/UserContext';

export type TradeProps = { trade: TradeUI; onTradeComplete: () => void };
export function Trade(props: TradeProps) {
  const userCtx = useContext(UserContext);
  const StratSelect = Select.ofType<Strats.Strategy>();

  const filterStrat: ItemPredicate<Strats.Strategy> = (query, strat) => {
    return strat.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  const renderStrat: ItemRenderer<Strats.Strategy> = (
    film,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={film.id}
        onClick={handleClick}
        text={film.label}
        popoverProps={{ usePortal: false }}
      />
    );
  };

  let [tradeData, setTradeData] = React.useState(props.trade);

  const jsDateFormatter: IDateFormatProps = {
    // note that the native implementation of Date functions differs between browsers
    formatDate: (date) => date.toLocaleDateString(),
    parseDate: (str) => new Date(str),
    placeholder: 'M/D/YYYY',
  };

  function renderStratForm(strat: number) {
    switch (strat) {
      case 0:
        return <StockForm trade={tradeData} setTrade={setTradeData} />;
      case 1:
        return <SimpleOptionsForm trade={tradeData} setTrade={setTradeData} />;
      case 2:
        return <SimpleOptionsForm trade={tradeData} setTrade={setTradeData} />;
      default:
        return <div></div>;
    }
  }

  const stratSelectChange = (i: Strats.Strategy, e?: SyntheticEvent) => {
    tradeData.Transactions[0].TransType = i.id;
    setTradeData({
      ...tradeData,
      Strategy: i.id,
      Transactions: tradeData.Transactions,
    });
    e?.stopPropagation();
  };

  const onSymbolChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTradeData({ ...tradeData, Symbol: e.target.value });
  };

  const onOpenedChange = (selectedDate: Date, isUserChange: boolean) => {
    setTradeData({ ...tradeData, Opened: selectedDate.getDate() });
  };

  const isNewLot = () => {
    return tradeData.Transactions[0].Lot.ID === '';
  };

  const onConfirmClick = () => {
    console.log(tradeData);
    new TradeService(userCtx.userData.accessToken)
      .CreateTrade(convertTradeUIToData(tradeData))
      .then((id) => {
        tradeData.Id = id;
        props.onTradeComplete();
      })
      .finally(() => {
        setTradeData(new TradeUI());
      });
  };

  const convertTradeUIToData = (trUI: TradeUI) => {
    const trModel: TradeModel = {
      OpenedAt: new Date(trUI.Opened),
      Strategy: trUI.Strategy,
      Symbol: trUI.Symbol,
      Transactions: convertTransUIToData(trUI.Transactions, trUI),
    };
    return trModel;
  };

  const convertReadLot = (lui: LotUI) => {
    const l: ReadLot = {
      ID: lui.ID,
      CreatedAt: lui.CreatedAt,
      Expiry: lui.Expiry,
      IsClosed: lui.IsClosed,
      IsMargin: lui.IsMargin,
      IsShort: lui.IsShort,
      Price: lui.Price,
      Quantity: lui.Quantity,
      Strategy: lui.Strategy,
      Strike: lui.Strike,
      Symbol: lui.Symbol,
      Obligation: lui.Obligation,
    };
    return l;
  };

  const convertTransUIToData = (trUI: TransactionUI[], tradeUI: TradeUI) => {
    return trUI.map((tr) => {
      const trModel: CreateTransaction = {
        OpenedAt: new Date(tradeUI.Opened),
        Amount: tr.Amount,
        Commission:
          tr.TransType !== 0
            ? tr.Quantity * userCtx.userData.settings.ContractComm
            : tr.Commission,
        Fees: tr.Fees,
        IsMargin: tr.IsMargin,
        Price: tr.Price,
        Quantity: tr.Quantity,
        Symbol: tradeUI.Symbol,
        Expiry: tr.Expiry || new Date(),
        Strike: tr.Strike,
        TransType: tr.TransType,
        IsShort: tr.IsShort,
        Lot: convertReadLot(tr.Lot),
      };
      return trModel;
    });
  };

  return (
    <div>
      <FormGroup label="Opened">
        <DateInput
          {...jsDateFormatter}
          onChange={onOpenedChange}
          defaultValue={new Date(tradeData.Opened)}
        />
      </FormGroup>
      <FormGroup
        helperText=""
        label="Symbol"
        labelFor="text-input"
        labelInfo=""
      >
        <InputGroup
          id="text-input"
          placeholder="Enter Ticker"
          defaultValue={tradeData.Symbol}
          onChange={onSymbolChange}
          disabled={!isNewLot()}
        />
      </FormGroup>

      <FormGroup helperText="" label="Strategy" labelFor="" labelInfo="">
        <StratSelect
          items={Strats.items}
          itemPredicate={filterStrat}
          itemRenderer={renderStrat}
          onItemSelect={stratSelectChange}
          filterable={false}
          disabled={!isNewLot()}
        >
          <Button
            text={Strats.items[tradeData.Strategy].label}
            rightIcon="double-caret-vertical"
          />
        </StratSelect>
      </FormGroup>

      {renderStratForm(tradeData.Strategy)}
      <div>
        <ButtonGroup fill={true}>
          <Button intent={Intent.PRIMARY} onClick={onConfirmClick}>
            Confirm
          </Button>
          <Button
            className="bp3-popover-dismiss"
            onClick={() => {
              setTradeData(new TradeUI());
              props.onTradeComplete();
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
