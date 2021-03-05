import { useAuth0 } from '@auth0/auth0-react';
import { Callout, Card, Intent } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { IEXService } from '../services/IEXService';
import { IEXStock } from '../services/models/IEXStock';
import './Home.css';

export type HomeProps = { message: string }; /* could also use interface */
export const Home = ({ message }: HomeProps) => {
  const initData: IEXStock[] = [];
  const [mostActives, setMostActives] = useState(initData);
  const [gainers, setGainers] = useState(initData);
  const [losers, setLosers] = useState(initData);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const iexSvc = new IEXService();
      const data = await iexSvc.getMostActive();
      setMostActives(data);
    }

    async function fetchGainers() {
      const iexSvc = new IEXService();
      const data = await iexSvc.getGainers();
      setGainers(data);
    }

    async function fetchLosers() {
      const iexSvc = new IEXService();
      const data = await iexSvc.getLosers();
      setLosers(data);
    }

    fetchData();
    fetchGainers();
    fetchLosers();
  }, []);

  const getChangeStyle = (x: number) => {
    return { color: x >= 0 ? '#62D96B' : '#FF6E4A' };
  };

  return (
    <div style={{ margin: '5px 0px 0px 0px' }}>
      {!isAuthenticated && (
        <Callout title="Welcome!" intent={Intent.PRIMARY}>
          Checkout our Tracker app to see how well you are running the wheel.
        </Callout>
      )}
      <div className="wrapper">
        <Card>
          <h4>Most Active</h4>
          <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
            <thead></thead>
            <tbody>
              {mostActives.map((l, index) => {
                return (
                  <tr>
                    <td>{l.symbol}</td>
                    <td>{l.latestPrice}</td>
                    <td style={getChangeStyle(l.change)}>{l.change}</td>
                    <td style={getChangeStyle(l.change)}>
                      {(l.changePercent * 100).toFixed(2)}
                    </td>
                    <td>{l.latestVolume}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card>
          <h4>Gainers</h4>
          <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
            <thead></thead>
            <tbody>
              {gainers.map((l, index) => {
                return (
                  <tr>
                    <td>{l.symbol}</td>
                    <td>{l.latestPrice}</td>
                    <td style={getChangeStyle(l.change)}>{l.change}</td>
                    <td style={getChangeStyle(l.change)}>
                      {(l.changePercent * 100).toFixed(2)}
                    </td>
                    <td>{l.latestVolume}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card>
          <h4>Losers</h4>
          <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
            <thead></thead>
            <tbody>
              {losers.map((l, index) => {
                return (
                  <tr>
                    <td>{l.symbol}</td>
                    <td>{l.latestPrice}</td>
                    <td style={getChangeStyle(l.change)}>{l.change}</td>
                    <td style={getChangeStyle(l.change)}>
                      {(l.changePercent * 100).toFixed(2)}
                    </td>
                    <td>{l.latestVolume}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
