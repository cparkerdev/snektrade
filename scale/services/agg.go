package services

import (
	"scale/repos"
)

// Agg : Aggregator Service
type Agg struct {
	tradeRepo *repos.Trade
}

func (a *Agg) getBalances() {

}

// NewAgg : Agg Service constructor
func NewAgg(connStr string) (*Agg, error) {
	tRepo, err := repos.NewTrade(connStr)
	tSvc := new(Agg)
	tSvc.tradeRepo = tRepo
	return tSvc, err
}
