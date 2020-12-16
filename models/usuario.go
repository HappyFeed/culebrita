package models

// usuario defines the properties of a User to be listed
type User struct {
	id    string `json:id`
	name  string `json:name,omitempty`
	score int    `json:score,omitempty`
}
