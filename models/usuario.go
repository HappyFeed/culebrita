package models

import (
	"fmt"

	"../cockroachdb"
)

// usuario defines the properties of a User to be listed
type User struct {
	Id    string `json:id`
	Name  string `json:name,omitempty`
	Score string `json:score,omitempty`
}

type Users []User

func NewUser(name string, score string) *User {
	user := &User{Name: name, Score: score}
	return user
}

func (this *User) Insert() error {
	cockroachdb.Init()
	sql := `INSERT INTO users (name, score) VALUES (` + `'` + this.Name + `'` + "," + `'` + this.Score + `'` + `);`
	fmt.Print(sql)
	_, err := cockroachdb.InsertUsers(sql)
	return err
}

func GetUsers() Users {
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
