package models

import (
	"encoding/json"
	"fmt"
	"net/http"
)

//Struct to make the request of the endpoints
type Response struct {
	Status      int         `json:"status"`
	Data        interface{} `json:"data"`
	Message     string      `json:"message"`
	contentType string
	writer      http.ResponseWriter
}

//Constructor of the struct response
func CreateDefaultResponse(w http.ResponseWriter) Response {
	return Response{Status: http.StatusOK, writer: w, contentType: "application/json"}
}

//function that organice the response
func SendData(w http.ResponseWriter, data interface{}) {
	response := CreateDefaultResponse(w)
	response.Data = data
	response.Send()
}

//Function that config the header and created the json to send
func (this *Response) Send() {
	this.writer.Header().Set("Content-Type", this.contentType)
	this.writer.Header().Set("done-by", "alejandro")
	this.writer.Header().Set("Access-Control-Allow-Origin", "*")
	this.writer.WriteHeader(this.Status)

	output, _ := json.Marshal(&this)
	fmt.Fprintf(this.writer, string(output))
}
