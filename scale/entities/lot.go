package entities

import "time"

//Lot : Asset Lots
type Lot struct {
	ID         string  `gorm:"primaryKey"`
	UserID     string  `gorm:"index;not null"`
	Symbol     string  `gorm:"not null"`
	Quantity   float32 `gorm:"not null"`
	Price      float32 `gorm:"not null"`
	Strategy   uint8   `gorm:"not null"`
	IsClosed   bool
	IsShort    bool
	IsMargin   bool
	Strike     float32
	Obligation float32
	Amount     float32
	Expiry     time.Time
	CreatedAt  time.Time
}
