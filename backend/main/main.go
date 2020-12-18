package main

import (
	"../web"
)

func main() {
	mux := web.Routes()
	server := web.NewServer(mux)
	server.Run()
}
