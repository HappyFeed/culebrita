package web

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
)

type Server struct {
	server *http.Server
}

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

func (s *Server) Run() {
	log.Fatal(s.server.ListenAndServe())
}
