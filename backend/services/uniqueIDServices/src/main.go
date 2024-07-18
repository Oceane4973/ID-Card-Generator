package main

// main.go
// =============================================
// Entry Point of the Go Application
// =============================================
// This file sets up the HTTP server and routes for the ID service.
// It loads environment variables, initializes the server, and defines
// the routes for generating simple and complex IDs.
// =============================================

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"id-service/src/handler"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "5007"
	}

	http.HandleFunc("/api/v1/id/simple", handler.GenerateSimpleID)
	http.HandleFunc("/api/v1/id/complex", handler.GenerateComplexID)

	log.Printf("ID Service is running on port %s\n", port)
	log.Printf("On localhost, you can click on these links:")
	log.Printf("Simple ID: http://localhost:%s/id/simple", port)
	log.Printf("Complex ID: http://localhost:%s/id/complex", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
