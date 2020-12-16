package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"

	"github.com/go-chi/chi"
)

var templates = template.Must(template.New("T").ParseGlob("ui/*.html"))

func main() {

	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "hola")
		//RenderTemplate(w, "ui/menu", nil)
	})
	//r.Get("/Scores")

	log.Fatal(http.ListenAndServe(":8080", r))
}

/*func RenderTemplate(w http.ResponseWriter, name string, data interface{}) {
	w.Header().Set("Content-Type", "text/html")

	err := templates.ExecuteTemplate(w, name, data)
	if err != nil {
		http.Error(w, "No es posible retornar el template", http.StatusInternalServerError)
	}
}*/
