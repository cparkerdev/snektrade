package repos

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// NewDBConn : Creates a new DB Connection
func NewDBConn(connStr string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	return db, err
}
