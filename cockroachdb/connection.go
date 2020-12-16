package cockroachdb

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func printBalances(db *sql.DB) {
	// Print out the balances.
	rows, err := db.Query("SELECT name, score FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	fmt.Println("Users:")
	for rows.Next() {
		var id, balance int
		if err := rows.Scan(&id, &balance); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%d %d\n", id, balance)
	}
}

func Conn() {
	// Connect to the "company_db" database.
	db, err := sql.Open("postgres", "postgresql://root@localhost:26257/culebrita_db?sslmode=disable")
	if err != nil {
		log.Fatal("Error connected to database", err)
	}

	defer db.Close()
	//Inserting a Row in to DB.
	if _, err := db.Exec(`INSERT INTO users (name, score) VALUES ('Alejandro', 500);`); err != nil {
		log.Fatal(err)
	}

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
