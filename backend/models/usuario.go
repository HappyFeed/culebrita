package models

import (
	"log"

	"../cockroachdb"
)

// Struct that define a User
type User struct {
	Id    string `json:id`
	Name  string `json:name,omitempty`
	Score string `json:score,omitempty`
}

//Array that save users
type Users []User

//Constructor of the user struct
func NewUser(name string, score string) (*User, error) {
	user := &User{Name: name, Score: score}
	err := user.Insert()
	if err != nil {
		log.Fatal(err)
	}
	return user, err
}

//Function that make the query and send to the database class
func (this *User) Insert() error {
	cockroachdb.Init()
	sql := `INSERT INTO users (name, score) VALUES (` + `'` + this.Name + `'` + "," + `'` + this.Score + `'` + `);`
	_, err := cockroachdb.InsertUsers(sql)
	return err
}

//Function that make the call to get the users
func GetUsers() Users {
	cockroachdb.Init()
	sql := "SELECT name, score FROM users"
	users := Users{}
	rows, _ := cockroachdb.ShowUsers(sql)

	for rows.Next() {
		user := User{}
		rows.Scan(&user.Name, &user.Score)
		users = append(users, user)
	}

	return users
}
