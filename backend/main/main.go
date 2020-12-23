package main

import (
	"../web"
)

//Function that initialice the server
func main() {
	mux := web.Routes()
	server := web.NewServer(mux)
	server.Run()
}
