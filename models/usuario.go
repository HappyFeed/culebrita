package models

import (
	"log"

	"../cockroachdb"
)

// usuario defines the properties of a User to be listed
type User struct {
	Id    string `json:id`
	Name  string `json:name,omitempty`
	Score string `json:score,omitempty`
}

type Users []User

func NewUser(name string, score string) (*User, error) {
	user := &User{Name: name, Score: score}
	err := user.Insert()
	if err != nil {
		log.Fatal(err)
	}
	return user, err
}

func (this *User) Insert() error {
	cockroachdb.Init()
	sql := `INSERT INTO users (name, score) VALUES (` + `'` + this.Name + `'` + "," + `'` + this.Score + `'` + `);`
	_, err := cockroachdb.InsertUsers(sql)
	return err
}

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
