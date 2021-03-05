export class LotUI {
  ID: string = '';
  Symbol: string = '';
  Quantity: number = 0;
  Price: number = 0;
  Strategy: number = 0;
  IsClosed: boolean = false;
  IsMargin: boolean = false;
  IsShort: boolean = false;
  Strike: number = 0;
  Expiry: Date = new Date();
  CreatedAt: Date = new Date();
  Obligation: number = 0;
}
