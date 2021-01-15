package models

// Strategy : enum type
type strategy uint8

const (
	// S : Stock
	S strategy = iota
	// C : Call
	C
	// P : Put
	P
	// CSP : Cash Secured Put
	CSP
	// CC : Covered Call
	CC
	// NP : Naked Put
	NP
	// NC : Naked Call
	NC
)
