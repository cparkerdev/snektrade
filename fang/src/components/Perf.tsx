import { Card, Elevation } from '@blueprintjs/core';
import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { TableTransactionUI } from './models/TransactionUI';
import { TradeService } from '../services/TradeService';
import { UserContext } from '../services/UserContext';

class AggTrans {
  symbol: string = '';
  amount: number = 0;
  gain: number = 0;
  loss: number = 0;
}

export const Perf = () => {
  const [agg, setAgg] = useState<AggTrans[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const tradeSvc = new TradeService(userCtx.userData.accessToken);
      const data = await tradeSvc.GetOpenTransactions();
      const trUIList: TableTransactionUI[] = data.map((t) => {
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
          CreatedAt: t.CreatedAt,
        };
      });

      let initList: AggTrans[] = [];

      const group = trUIList
        .reduce((r, a) => {
          const curIndx = r.findIndex((x) => {
            return x.symbol === a.Symbol;
          });

          curIndx !== -1
            ? (r[curIndx].amount += a.Amount)
            : r.push({ symbol: a.Symbol, amount: a.Amount, gain: 0, loss: 0 });

          return r;
        }, initList)
        .map((x) => {
          if (x.amount < 0) {
            x.loss = x.amount;
          } else {
            x.gain = x.amount;
          }
          return x;
        });

      setAgg(group);
      setColors(group.map((x) => (x.gain === 0 ? '#C23030' : '#0D8050')));
    }
    fetchData();
  }, [userCtx]);

  return (
    <div>
      <Card
        style={{ height: '450px' }}
        interactive={false}
        elevation={Elevation.TWO}
      >
        {MyResponsiveBar(agg, colors)}
      </Card>
    </div>
  );
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = (data: any, colors: any) => (
  <ResponsiveBar
    data={data}
    keys={['gain', 'loss']}
    indexBy="symbol"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={colors}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[]}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="#F5F8FA"
    legends={[]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    isInteractive={false}
    theme={{
      textColor: '#F5F8FA',
    }}
  />
);
