module scale

go 1.15

replace scale/services => ./services

replace scale/repos => ./repos

replace scale/models => ./models

replace scale/entities => ./entities

replace scale/controllers => ./controllers

require (
	github.com/auth0/go-jwt-middleware v1.0.0
	github.com/codegangsta/negroni v1.0.0
	github.com/form3tech-oss/jwt-go v3.2.2+incompatible
	github.com/gorilla/mux v1.8.0
	github.com/rs/cors v1.7.0
	scale/controllers v0.0.0-00010101000000-000000000000
	scale/repos v0.0.0-00010101000000-000000000000
	scale/services v0.0.0-00010101000000-000000000000
)
