package cockroachdb

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

//Initialice the database
func Init() {
	Connect()
	CreateTable()
}

//Return de connection to the database.
func GetConnection() *sql.DB {
	return db
}

// Connect to the "culebrita_db" database.
func Connect() {
	if GetConnection() != nil {
		return
	}
	if connection, err := sql.Open("postgres", "postgresql://root@localhost:26257/culebrita_db?sslmode=disable"); err != nil {
		panic(err)
	} else {
		db = connection
	}
}

// Create the "users" table.
func CreateTable() {
	if _, err := db.Exec(
		"CREATE TABLE IF NOT EXISTS users (id SERIAL, name STRING(50) NULL, score STRING(100) NOT NULL, PRIMARY KEY (id))"); err != nil {
		log.Fatal(err)
	}

}

//Inserting a Row in to database.
func InsertUsers(query string) (sql.Result, error) {
	result, err := db.Exec(query)
	if err != nil {
		log.Println(err)
	}
	return result, err
}

// function SELECT to get the users from database
func ShowUsers(query string, args ...interface{}) (*sql.Rows, error) {
	rows, err := db.Query(query, args...)
	if err != nil {
		log.Println(err)
	}
	return rows, err
}
