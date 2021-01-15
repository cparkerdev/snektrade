package entities

import "time"

//Transaction : DB type for all account transactions
type Transaction struct {
	ID          string `gorm:"primaryKey"`
	Symbol      string
	Quantity    float32
	Price       float32
	Amount      float32
	Commission  float32
	Fees        float32
	IsMargin    bool
	OpenedAt    time.Time
	CreatedAt   time.Time
	TradeID     string
	Strike      float32
	Expiry      time.Time
	IsClosed    bool
	IsExercised bool
	TransType   uint8
	IsShort     bool
}
