package models

// usuario defines the properties of a User to be listed
type User struct {
	Id    string `json:id`
	Name  string `json:name,omitempty`
	Score int    `json:score,omitempty`
}

func dbTable() {

}
