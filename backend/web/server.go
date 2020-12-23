package web

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
)

//Struct that define the server
type Server struct {
	server *http.Server
}

//Constructor of the server struct
func NewServer(Mux *chi.Mux) *Server {
	s := &http.Server{
		Addr:           ":9080",
		Handler:        Mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	return &Server{s}
}

//Function that start the server
func (s *Server) Run() {
	log.Fatal(s.server.ListenAndServe())
}
