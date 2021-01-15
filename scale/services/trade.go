package services

import (
	"scale/entities"
	"scale/models"
	"scale/repos"
)

// Trade : Trade Service
type Trade struct {
	tradeRepo *repos.Trade
}

// CreateTrade : Creates new trade
func (t Trade) CreateTrade(ctModel *models.CreateTrade) string {
	ctEntity := &entities.Trade{
		Symbol:   ctModel.Symbol,
		Strategy: ctModel.Strategy,
		OpenedAt: ctModel.OpenedAt,
	}
	trans := []*entities.Transaction{}
	newLots := []*entities.Lot{}
	updateLots := []*entities.Lot{}

	for _, tMod := range ctModel.Transactions {
		trans = append(trans, convertNewTransaction(tMod))
		if tMod.Lot.ID == "" {
			newLots = append(newLots, createLotFromTransaction(tMod))
		} else {
			updateLots = append(updateLots, updateLotFromTransaction(tMod))
		}

	}

	ctEntity.Transactions = trans
	id, _ := t.tradeRepo.CreateTrade(ctEntity)

	for _, l := range newLots {
		t.tradeRepo.CreateLot(l)
	}

	for _, l := range updateLots {
		t.tradeRepo.UpdateLot(l)
	}

	return id
}

// FindOpenTransactions : Find All Open Transactions
func (t Trade) FindOpenTransactions() []*models.ReadTransaction {
	trEntity := t.tradeRepo.FindOpenTransactions()
	trModel := []*models.ReadTransaction{}

	for _, tre := range trEntity {
		trModel = append(trModel, convertReadTransaction(tre))
	}

	return trModel
}

// FindOpenLots : Get All Open Lots
func (t Trade) FindOpenLots() []*models.ReadLot {
	lEntity := t.tradeRepo.FindOpenLots()

	lModel := []*models.ReadLot{}

	for _, l := range lEntity {
		lModel = append(lModel, convertReadLot(&l))
	}

	return lModel
}

// NewTrade : Trade Service constructor
func NewTrade(t *repos.Trade) *Trade {
	tSvc := new(Trade)
	tSvc.tradeRepo = t
	return tSvc
}

func convertReadTransaction(te entities.Transaction) *models.ReadTransaction {
	return &models.ReadTransaction{
		ID:         te.ID,
		CreatedAt:  te.CreatedAt,
		Symbol:     te.Symbol,
		Quantity:   te.Quantity,
		Price:      te.Price,
		Amount:     te.Amount,
		Commission: te.Commission,
		Fees:       te.Fees,
		IsMargin:   te.IsMargin,
		OpenedAt:   te.OpenedAt,
		Strike:     te.Strike,
		Expiry:     te.Expiry,
		TransType:  te.TransType,
		IsShort:    te.IsShort,
	}
}

func convertNewTransaction(tMod *models.CreateTransaction) *entities.Transaction {
	return &entities.Transaction{
		Symbol:     tMod.Symbol,
		Quantity:   tMod.Quantity,
		Price:      tMod.Price,
		Amount:     calcTransactionAmount(tMod),
		Commission: tMod.Commission,
		Fees:       tMod.Fees,
		IsMargin:   tMod.IsMargin,
		OpenedAt:   tMod.OpenedAt,
		Strike:     tMod.Strike,
		Expiry:     tMod.Expiry,
		TransType:  tMod.TransType,
		IsShort:    tMod.IsShort,
	}
}

func createLotFromTransaction(t *models.CreateTransaction) *entities.Lot {
	return &entities.Lot{
		Symbol:     t.Symbol,
		Quantity:   t.Quantity,
		Price:      t.Price,
		Strategy:   t.TransType,
		Strike:     t.Strike,
		Expiry:     t.Expiry,
		IsShort:    t.IsShort,
		IsMargin:   t.IsMargin,
		Obligation: calcObligation(t),
	}
}

func convertReadLot(le *entities.Lot) *models.ReadLot {
	return &models.ReadLot{
		ID:         le.ID,
		Symbol:     le.Symbol,
		Quantity:   le.Quantity,
		Price:      le.Price,
		Strategy:   le.Strategy,
		IsClosed:   le.IsClosed,
		IsMargin:   le.IsMargin,
		IsShort:    le.IsShort,
		Strike:     le.Strike,
		Expiry:     le.Expiry,
		CreatedAt:  le.CreatedAt,
		Amount:     le.Amount,
		Obligation: le.Obligation,
	}
}

func updateLotFromTransaction(t *models.CreateTransaction) *entities.Lot {

	tObi := calcObligation(t)

	// if both are short then this would mean we are selling more of the short position
	if t.IsShort == t.Lot.IsShort {
		t.Lot.Quantity += t.Quantity
		t.Lot.Obligation += tObi
	} else {

		/*
			// if quanitites are equal then the lot should be closed, otherwise decrement/incrment
			if t.Quantity == t.Lot.Quantity {

			}
		*/
		t.Lot.Quantity -= t.Quantity
		t.Lot.Obligation -= tObi
		if t.Lot.Quantity == 0 {
			t.Lot.IsClosed = true
		}
	}

	return &entities.Lot{
		ID:         t.Lot.ID,
		Quantity:   t.Lot.Quantity,
		IsClosed:   t.Lot.IsClosed,
		Obligation: t.Lot.Obligation,
	}

}

func calcTransactionAmount(t *models.CreateTransaction) float32 {

	var sMux float32
	if t.IsShort {
		sMux = 1
	} else {
		sMux = -1
	}

	var optMux float32
	if t.TransType == 0 {
		optMux = 1
	} else {
		optMux = 100
	}

	amount := (sMux * (t.Price * t.Quantity * optMux)) - (t.Fees + t.Commission)

	return amount
}

func calcObligation(t *models.CreateTransaction) float32 {
	var obi float32

	if t.TransType == 0 {
		obi = t.Price * t.Quantity
	} else if t.IsShort {
		obi = t.Strike * t.Quantity
	}

	return obi
}
