package web

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"../models"
	"github.com/go-chi/chi"
)

//Function that init the router and created the endpoints
func Routes() *chi.Mux {
	Mux := chi.NewMux()

	Mux.Get("/", helloHandler)
	Mux.Post("/save", saveMenu)
	Mux.Get("/scores", showScores)

	return Mux
}

//Funcion that response the endpoint
func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("done-by", "alejandro")

	res := map[string]interface{}{"Message": "Welcome"}

	_ = json.NewEncoder(w).Encode(res)
}

//Function that make the process to get and send the data to save users
func saveMenu(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "text/plain")
	w.Header().Set("done-by", "alejandro")

	type User struct {
		Name  string
		Score string
	}

	var newUser User

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	if len(body) > 0 {
		err = json.Unmarshal(body, &newUser)
		log.Println(newUser.Name)
		if err != nil {
			log.Fatal(err)
		}
	}

	res := map[string]interface{}{"Message": "good"}
	_ = json.NewEncoder(w).Encode(res)
	context := make(map[string]interface{})

	username := newUser.Name
	score := newUser.Score
	if _, err := models.NewUser(username, score); err != nil {
		errorMessage := err.Error()
		context["Error"] = errorMessage
	}
}

//Function that call to get the users
func showScores(w http.ResponseWriter, r *http.Request) {
	models.SendData(w, models.GetUsers())
}
