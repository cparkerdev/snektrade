package entities

import "time"

//Trade : DB type for all account orders
type Trade struct {
	ID           string `gorm:"primaryKey"`
	Symbol       string
	Strategy     uint8
	Transactions []*Transaction
	OpenedAt     time.Time
	CreatedAt    time.Time
}
