package models

import "time"

//ReadTransaction : DB type for all account transactions
type ReadTransaction struct {
	ID          string
	Symbol      string
	Quantity    float32
	Price       float32
	Amount      float32
	Commission  float32
	Fees        float32
	IsMargin    bool
	OpenedAt    time.Time
	CreatedAt   time.Time
	isClosed    bool
	IsExercised bool
	TransType   uint8
	Strike      float32
	Expiry      time.Time
	IsShort     bool
}

//CreateTransaction : DB type for all account transactions
type CreateTransaction struct {
	Symbol     string
	Quantity   float32
	Price      float32
	Commission float32
	Fees       float32
	Strike     float32
	Expiry     time.Time
	IsMargin   bool
	OpenedAt   time.Time
	TransType  uint8
	IsShort    bool
	Lot        ReadLot
}
