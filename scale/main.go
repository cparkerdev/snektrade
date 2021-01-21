package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"scale/controllers"
	"scale/repos"
	"scale/services"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/codegangsta/negroni"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type customClaim map[string][]interface {
}

func main() {

	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {

			aud := token.Claims.(jwt.MapClaims)["aud"].([]interface{})

			s := make([]string, len(aud)) // https://stackoverflow.com/questions/44027826/convert-interface-to-string-in-golang
			for i, v := range aud {
				s[i] = fmt.Sprint(v)
			}
			token.Claims.(jwt.MapClaims)["aud"] = s

			// Verify 'aud' claim
			reqAud := "https://snekst.com/trade"

			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(reqAud, false)
			if !checkAud {
				return token, errors.New("invalid audience")
			}
			// Verify 'iss' claim
			iss := "https://snekst.us.auth0.com/"
			checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
			if !checkIss {
				return token, errors.New("invalid issuer")
			}

			cert, err := controllers.GetPemCert(token)
			if err != nil {
				panic(err.Error())
			}

			result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
			return result, nil
		},
		SigningMethod: jwt.SigningMethodRS256,
	})

	var dsn string

	isHeroku := os.Getenv("IS_HEROKU")
	// If deployed to heroku then use that db var instead use our own
	if isHeroku == "" {

		dbHost := os.Getenv("SNEKTRADE_DB_HOST")
		dbUser := os.Getenv("SNEKTRADE_DB_USER")
		dbPass := os.Getenv("SNEKTRADE_DB_PASS")
		dbName := os.Getenv("SNEKTRADE_DB_NAME")
		dbPort := os.Getenv("SNEKTRADE_DB_PORT")

		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", dbHost, dbUser, dbPass, dbName, dbPort)

	} else {
		dsn = os.Getenv("DATABASE_URL")
	}

	port := os.Getenv("PORT")

	tRepo, _ := repos.NewTrade(dsn)
	tRepo.Migrate()

	tSvc := services.NewTrade(tRepo)

	tradeCtrl := controllers.NewTrade(tSvc)
	transCtrl := controllers.NewTrans(tSvc)
	lotCtrl := controllers.NewLot(tSvc)
	settingsCtrl := controllers.NewAccountSettings(tSvc)

	r := mux.NewRouter()

	// This route is always accessible
	/*
		r.Handle("/api/public", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			message := "Hello from a public endpoint! You don't need to be authenticated to see this."
			responseJSON(message, w, http.StatusOK)
		}))
	*/

	// This route is only accessible if the user has a valid Access Token
	// We are chaining the jwtmiddleware middleware into the negroni handler function which will check
	// for a valid token.
	r.Handle("/trade", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(tradeCtrl.Handle))))

	r.Handle("/transaction", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(transCtrl.Handle))))

	r.Handle("/lot", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(lotCtrl.Handle))))

	r.Handle("/settings", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(settingsCtrl.Handle))))

	/*
		mux := http.NewServeMux()
		mux.HandleFunc("/trade", tradeCtrl.Handle)
		mux.HandleFunc("/transaction", transCtrl.Handle)
		mux.HandleFunc("/lot", lotCtrl.Handle)

	*/
	// http.ListenAndServe(fmt.Sprintf(":%s", port), mux)
	/*
		c := cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowCredentials: true,
			AllowedHeaders:   []string{"Authorization"},
		})
	*/

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})

	handler := c.Handler(r)
	http.Handle("/", r)
	fmt.Println("Listening...")
	http.ListenAndServe(fmt.Sprintf("0.0.0.0:%s", port), handler)
}
