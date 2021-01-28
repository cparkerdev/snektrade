package entities

import "time"

//Trade : DB type for all account orders
type Trade struct {
	ID           string `gorm:"primaryKey"`
	UserID       string `gorm:"index;not null"`
	Symbol       string `gorm:"not null"`
	Strategy     uint8  `gorm:"not null"`
	Transactions []*Transaction
	OpenedAt     time.Time
	CreatedAt    time.Time
}
