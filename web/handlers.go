package web

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func Routes() *chi.Mux {
	Mux := chi.NewMux()

	Mux.Use(
		middleware.Logger,
		middleware.Recoverer,
	)

	Mux.Post("/saveScore", nil)

	return Mux
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("done-by", "alejandro")

	res := map[string]interface{}{"Message": "Hello World"}

	_ = json.NewEncoder(w).Encode(res)
}
