package entities

import "time"

//Lot : Asset Lots
type Lot struct {
	ID         string `gorm:"primaryKey"`
	Symbol     string
	Quantity   float32
	Price      float32
	Strategy   uint8
	IsClosed   bool
	IsShort    bool
	IsMargin   bool
	Strike     float32
	Obligation float32
	Amount     float32
	Expiry     time.Time
	CreatedAt  time.Time
}
