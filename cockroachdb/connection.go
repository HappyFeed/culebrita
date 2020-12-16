package cockroachdb

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

func Init() {
	Connect()
	CreateTable()
}

func GetConnection() *sql.DB {
	return db
}

func Connect() {
	if GetConnection() != nil {
		return
	}
	// Connect to the "culebrita_db" database.
	if connection, err := sql.Open("postgres", "postgresql://root@localhost:26257/culebrita_db?sslmode=disable"); err != nil {
		panic(err)
	} else {
		db = connection
	}
}

func CreateTable() {
	// Create the "users" table.
	if _, err := db.Exec(
		"CREATE TABLE IF NOT EXISTS users (id SERIAL, name STRING(50) NULL, score STRING(100) NOT NULL, PRIMARY KEY (id))"); err != nil {
		log.Fatal(err)
	}

}

func InsertUsers(query string) (sql.Result, error) {
	//Inserting a Row in to DB.
	result, err := db.Exec(query)
	if err != nil {
		log.Println(err)
	}
	return result, err
}

func ShowUsers(query string, args ...interface{}) (*sql.Rows, error) {
	// Print out the balances before an account transfer (below).
	rows, err := db.Query(query, args...)
	if err != nil {
		log.Println(err)
	}
	return rows, err
}
