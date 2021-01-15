import { TableTransactionUI } from "../components/models/TransactionUI";

export const calcTransAmount = (t: TableTransactionUI) => {
    return (t.Price * (t.IsShort ? -1 : 1) * t.Quantity) - t.Commission - t.Fees;
}