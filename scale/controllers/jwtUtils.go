package controllers

import (
	"net/http"
	"strings"

	jwt "github.com/form3tech-oss/jwt-go"
)

// CustomClaims : holds all custom permisions for user
type CustomClaims struct {
	Scope string `json:"scope"`
	jwt.StandardClaims
}

// CheckScope : Checks if user has a scope or not
func CheckScope(scope string, tokenString string) bool {
	token, _ := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		cert, err := GetPemCert(token)
		if err != nil {
			return nil, err
		}
		result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
		return result, nil
	})

	claims, ok := token.Claims.(*CustomClaims)

	hasScope := false
	if ok && token.Valid {
		result := strings.Split(claims.Scope, " ")
		for i := range result {
			if result[i] == scope {
				hasScope = true
			}
		}
	}

	return hasScope
}

// GetUserID : Get user Id from jwt token
func GetUserID(r *http.Request) string {

	authHeaderParts := strings.Split(r.Header.Get("Authorization"), " ")
	tokenString := authHeaderParts[1]

	token, _ := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		cert, err := GetPemCert(token)
		if err != nil {
			return nil, err
		}
		result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
		return result, nil
	})

	claims, ok := token.Claims.(*CustomClaims)

	if ok && token.Valid {
		return claims.Subject
	}

	return ""
}
