package entities

import "time"

//AccountSettings : Used to store account wide settings for users
type AccountSettings struct {
	ID           string  `gorm:"primaryKey"`
	UserID       string  `gorm:"index;not null"`
	ContractComm float32 `gorm:"default:0"`
	AssignFee    float32 `gorm:"default:0"`
	CreatedAt    time.Time
}
