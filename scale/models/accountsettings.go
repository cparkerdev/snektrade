package models

//ReadAccountSettings : Used to store account wide settings for users
type ReadAccountSettings struct {
	ID           string `gorm:"primaryKey"`
	ContractComm float32
	AssignFee    float32
}

//UpsertAccountSettings : Used to store account wide settings for users
type UpsertAccountSettings struct {
	ID           string `gorm:"primaryKey"`
	ContractComm float32
	AssignFee    float32
}
