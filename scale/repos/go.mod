module scale/repos

go 1.15

replace scale/entities => ../entities

require (
	github.com/gofrs/uuid v3.2.0+incompatible
	github.com/google/uuid v1.1.4 // indirect
	gorm.io/driver/postgres v1.0.6
	gorm.io/gorm v1.20.9
	scale/entities v0.0.0-00010101000000-000000000000
)
