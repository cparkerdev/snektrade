import { CreateTransaction } from './TransactionModel';

export class TradeModel {
  OpenedAt: Date = new Date();
  Symbol: string = '';
  Strategy: number = 0;
  Transactions: CreateTransaction[] = [];
}

export class ReadTradeModel {
  ID: string = '';
  OpenedAt: Date = new Date();
  Symbol: string = '';
  Strategy: number = 0;
  Transactions: CreateTransaction[] = [];
}
