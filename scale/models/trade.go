package models

import "time"

// ReadTrade : ReadTrade Model
type ReadTrade struct {
	ID           string
	Symbol       string
	Strategy     uint8
	Transactions []ReadTransaction
	OpenedAt     time.Time
	CreatedAt    int64
}

// CreateTrade : CreateTrade Model
type CreateTrade struct {
	Symbol       string
	Strategy     uint8
	Transactions []*CreateTransaction
	OpenedAt     time.Time
}
