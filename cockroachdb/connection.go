package cockroachdb

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
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
	// Create the "accounts" table.
	if _, err := db.Exec(
		"CREATE TABLE IF NOT EXISTS users (id SERIAL, name STRING(50) NULL, score INT NOT NULL, PRIMARY KEY (id)"); err != nil {
		log.Fatal(err)
	}

}

func InsertUsers(nameUser string, scoreUser int) {
	//Inserting a Row in to DB.
	score := strconv.Itoa(scoreUser)
	if _, err := db.Exec("INSERT INTO users (name, score) VALUES (" + nameUser + "," + score + ");"); err != nil {
		log.Fatal(err)
	}
}

func showUsers() {
	// Print out the balances before an account transfer (below).
	rows, err := db.Query("SELECT name, score FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var name string
		var score int64
		if err := rows.Scan(&name, &score); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Name: %d \t Score: %s \n", name, score)
	}
}
