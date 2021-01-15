module scale/services

go 1.15

replace scale/models => ../models

replace scale/repos => ../repos

replace scale/entities => ../entities

require (
	scale/entities v0.0.0-00010101000000-000000000000
	scale/models v0.0.0-00010101000000-000000000000
	scale/repos v0.0.0-00010101000000-000000000000
)
