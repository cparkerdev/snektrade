import { TransactionUI } from './TransactionUI';

export class TradeUI {
  Id: string = '';
  Opened: number = Date.now();
  Symbol: string = '';
  Strategy: number = 0;
  Transactions: TransactionUI[] = [new TransactionUI()];
}
