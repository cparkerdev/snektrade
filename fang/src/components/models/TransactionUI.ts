import { LotUI } from "./LotUI"

export class TransactionUI {
    Id: string = ''
    Symbol: string = ''
	Quantity: number = 1
	Price: number = 0
	Amount: number = 0
	Commission: number = 0
	Fees: number = 0
    IsMargin: boolean = false
    Strike: number = 0
    Expiry: Date | null = null
	IsExercised: boolean = false
	TransType: number = 0
	IsShort: boolean = false
	Lot: LotUI = new LotUI();
}


export class TableTransactionUI {
    Id: string = ''
    Symbol: string = ''
	Quantity: number = 1
	Price: number = 0
	Amount: number = 0
	Commission: number = 0
	Fees: number = 0
    IsMargin: boolean = false
    Strike: number = 0
    Expiry: Date | null = null
	IsExercised: boolean = false
	TransType: number = 0
	IsShort: boolean = false
	CreatedAt: Date = new Date()
}