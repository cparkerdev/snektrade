import { ReadLot } from './LotModel';

export class CreateTransaction {
  Symbol: string = '';
  Quantity: number = 0;
  Price: number = 0;
  Amount: number = 0;
  Commission: number = 0;
  Fees: number = 0;
  IsMargin: boolean = false;
  OpenedAt: Date = new Date();
  Strike: number = 0;
  Expiry: Date = new Date();
  TransType: number = 0;
  IsShort: boolean = false;
  Lot: ReadLot = new ReadLot();
}

export class ReadTransaction {
  ID: string = '';
  Symbol: string = '';
  Quantity: number = 0;
  Price: number = 0;
  Amount: number = 0;
  Commission: number = 0;
  Fees: number = 0;
  IsMargin: boolean = false;
  OpenedAt: Date = new Date();
  Strike: number = 0;
  Expiry: Date = new Date();
  isClosed: boolean = false;
  IsExercised: boolean = false;
  TransType: number = 0;
  IsShort: boolean = false;
  CreatedAt: Date = new Date();
}
