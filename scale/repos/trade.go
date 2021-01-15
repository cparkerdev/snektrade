package repos

import (
	"fmt"
	"scale/entities"

	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

// Trade : Trancaction Service
type Trade struct {
	db *gorm.DB
}

// CreateTrade : Creates new transaction
func (t Trade) CreateTrade(tr *entities.Trade) (string, error) {
	guid, _ := uuid.NewV1()
	tr.ID = guid.String()
	assignTransGUID(tr.Transactions)
	result := t.db.Create(&tr)
	fmt.Println(result.Error)
	return tr.ID, result.Error
	// returns inserted data's primary key
	// result.Error        // returns error
	// result.RowsAffected // returns inserted records count
}

// FindOpenTransactions : Get all open transactions
func (t Trade) FindOpenTransactions() []entities.Transaction {
	var trans []entities.Transaction

	t.db.Find(&trans)

	return trans

}

// FindOpenLots : Get all open lots
func (t Trade) FindOpenLots() []entities.Lot {
	var lots []entities.Lot

	t.db.Where("is_closed = ?", false).Find(&lots)

	return lots
}

// CreateLot : Creates a new lot for a position
func (t Trade) CreateLot(l *entities.Lot) (string, error) {
	guid, _ := uuid.NewV1()
	l.ID = guid.String()
	result := t.db.Create(&l)
	return l.ID, result.Error
}

// UpdateLot : Update existing Lot in repo
func (t Trade) UpdateLot(l *entities.Lot) error {
	result := t.db.Updates(&l)
	return result.Error
}

func assignTransGUID(trans []*entities.Transaction) {
	for _, tr := range trans {
		guid, _ := uuid.NewV1()
		tr.ID = guid.String()
	}
}

// Migrate : Migrate Models
func (t Trade) Migrate() error {
	err := t.db.AutoMigrate(&entities.Trade{}, &entities.Transaction{}, &entities.Lot{})
	return err
}

// NewTrade : Trade Repo constructor factory
func NewTrade(connStr string) (*Trade, error) {
	tr := new(Trade)
	db, err := NewDBConn(connStr)
	if db != nil {
		tr.db = db
	}
	return tr, err
}
