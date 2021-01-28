package entities

import "time"

//Transaction : DB type for all account transactions
type Transaction struct {
	ID          string  `gorm:"primaryKey"`
	UserID      string  `gorm:"index;not null"`
	Symbol      string  `gorm:"not null"`
	Quantity    float32 `gorm:"not null"`
	Price       float32 `gorm:"not null"`
	Amount      float32 `gorm:"not null"`
	Commission  float32 `gorm:"not null"`
	Fees        float32 `gorm:"not null"`
	IsMargin    bool
	OpenedAt    time.Time
	CreatedAt   time.Time
	TradeID     string
	Strike      float32 `gorm:"not null"`
	Expiry      time.Time
	IsClosed    bool
	IsExercised bool
	TransType   uint8 `gorm:"not null"`
	IsShort     bool
}
