package models

// Strategy : enum type
type transtype uint8

const (
	// TTS : Stock
	TTS transtype = iota
	// TTC : Call
	TTC
	// TTP : Put
	TTP
)
