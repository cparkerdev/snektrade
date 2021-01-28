package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"scale/models"
	"scale/services"
)

// Trade : Trade Controller for Handle API reqs
type Trade struct {
	tradeSvc *services.Trade
}

// Handle : Handle for Creating New Trade
func (t Trade) Handle(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	switch method := req.Method; method {
	case "POST":
		t.postHandle(w, req)
	case "GET":
		t.getHandle(w, req)
	default:
		return
	}
}

func (t Trade) postHandle(w http.ResponseWriter, req *http.Request) {

	userID := GetUserID(req)

	var ct models.CreateTrade

	err := json.NewDecoder(req.Body).Decode(&ct)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	id := t.tradeSvc.CreateTrade(&ct, userID)

	ctr := &CreateTradeResponse{
		ID: id,
	}

	js, err := json.Marshal(ctr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func (t Trade) getHandle(w http.ResponseWriter, req *http.Request) {

}

// NewTrade : Contructor for Trade Controller
func NewTrade(tSvc *services.Trade) *Trade {
	nt := new(Trade)
	nt.tradeSvc = tSvc
	return nt
}

// CreateTradeResponse : body of return message
type CreateTradeResponse struct {
	ID string
}

// Transaction : Transaction Controller for Handle API reqs
type Transaction struct {
	tradeSvc *services.Trade
}

// NewTrans : Contructor for Transaction Controller
func NewTrans(tSvc *services.Trade) *Transaction {
	nt := new(Transaction)
	nt.tradeSvc = tSvc
	return nt
}

// Handle : Handle for Creating New Transactions
func (t Transaction) Handle(w http.ResponseWriter, req *http.Request) {
	//enableCors(&w)
	switch method := req.Method; method {
	case "POST":
		t.postHandle(w, req)
	case "GET":
		t.getHandle(w, req)
	default:
		return
	}

}

func (t Transaction) postHandle(w http.ResponseWriter, req *http.Request) {
}

func (t Transaction) getHandle(w http.ResponseWriter, req *http.Request) {

	userID := GetUserID(req)
	trans := t.tradeSvc.FindOpenTransactions(userID)

	js, err := json.Marshal(trans)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// Lot : Controller for Lots
type Lot struct {
	tradeSvc *services.Trade
}

// NewLot : Contructor for Lot Controller
func NewLot(tSvc *services.Trade) *Lot {
	nt := new(Lot)
	nt.tradeSvc = tSvc
	return nt
}

// Handle : Handle for Creating New Lots
func (l Lot) Handle(w http.ResponseWriter, req *http.Request) {
	//enableCors(&w)
	switch method := req.Method; method {
	case "GET":
		l.getHandle(w, req)
	default:
		return
	}

}

func (l Lot) getHandle(w http.ResponseWriter, req *http.Request) {
	userID := GetUserID(req)
	lots := l.tradeSvc.FindOpenLots(userID)
	js, err := json.Marshal(lots)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// AccountSettings : Controller for Account Settings
type AccountSettings struct {
	tradeSvc *services.Trade
}

// NewAccountSettings : Contructor for Lot Controller
func NewAccountSettings(tSvc *services.Trade) *AccountSettings {
	nt := new(AccountSettings)
	nt.tradeSvc = tSvc
	return nt
}

// Handle : Handle for Creating New Lots
func (as AccountSettings) Handle(w http.ResponseWriter, req *http.Request) {
	//enableCors(&w)
	switch method := req.Method; method {
	case "GET":
		as.getHandle(w, req)
	case "POST":
		as.postHandle(w, req)
	default:
		return
	}

}

func (as AccountSettings) getHandle(w http.ResponseWriter, req *http.Request) {
	userID := GetUserID(req)
	settings := as.tradeSvc.FindAccountSettings(userID)
	js, err := json.Marshal(settings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func (as AccountSettings) postHandle(w http.ResponseWriter, req *http.Request) {
	userID := GetUserID(req)

	var upSettings *models.UpsertAccountSettings

	err := json.NewDecoder(req.Body).Decode(&upSettings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println(upSettings)

	settings := as.tradeSvc.SaveAccountSettings(upSettings, userID)
	js, err := json.Marshal(settings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
}
