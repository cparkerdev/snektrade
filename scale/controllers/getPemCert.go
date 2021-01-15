package controllers

import (
	"encoding/json"
	"errors"
	"net/http"

	jwt "github.com/form3tech-oss/jwt-go"
)

// JSONWebKeys : data struct for user JSON token
type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

// Jwks : main jwks data struct
type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

// GetPemCert : Gets the Pem Cert
func GetPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get("https://snekst.us.auth0.com/.well-known/jwks.json")

	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	for k := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := errors.New("unable to find appropriate key")
		return cert, err
	}

	return cert, nil
}
