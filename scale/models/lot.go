package models

import "time"

// CreateLot : Stores Asset Information
type CreateLot struct {
	ID       string `gorm:"primaryKey"`
	Symbol   string
	Quantity float32
	Price    float32
	Strategy uint8
	IsClosed bool
	IsMargin bool
	Strike   float32
	IsShort  bool
	Expiry   time.Time
}

// ReadLot : Stores Asset Information
type ReadLot struct {
	ID         string `gorm:"primaryKey"`
	Symbol     string
	Quantity   float32
	Price      float32
	Strategy   uint8
	IsClosed   bool
	IsMargin   bool
	IsShort    bool
	Strike     float32
	Amount     float32
	Obligation float32
	Expiry     time.Time
	CreatedAt  time.Time
}
