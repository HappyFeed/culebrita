package web

import (
	"encoding/json"
	"net/http"

	"../models"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func Routes() *chi.Mux {
	Mux := chi.NewMux()

	Mux.Use(
		middleware.Logger,
		middleware.Recoverer,
	)
	Mux.Get("/", helloHandler)
	Mux.Get("/save", saveMenu)
	//Mux.Post("/save", saveScore)
	Mux.Get("/scores", showScores)

	return Mux
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("done-by", "alejandro")

	res := map[string]interface{}{"Message": "Hello world"}

	_ = json.NewEncoder(w).Encode(res)
}

func saveMenu(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("done-by", "alejandro")

	res := map[string]interface{}{"Message": "Save menu"}

	_ = json.NewEncoder(w).Encode(res)
	context := make(map[string]interface{})
	//username := r.FormValue("username")
	//score := r.FormValue("score")
	username := "Camila"
	score := "800"
	if _, err := models.NewUser(username, score); err != nil {
		errorMessage := err.Error()
		context["Error"] = errorMessage
	}
}

func showScores(w http.ResponseWriter, r *http.Request) {
	models.SendData(w, models.GetUsers())
}

func saveScore(w http.ResponseWriter, r *http.Request) {
	context := make(map[string]interface{})
	//username := r.FormValue("username")
	//score := r.FormValue("score")
	username := "Juan"
	score := "600"
	if _, err := models.NewUser(username, score); err != nil {
		errorMessage := err.Error()
		context["Error"] = errorMessage
	}
}
