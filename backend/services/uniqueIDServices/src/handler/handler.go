package handler

// handler.go
// =============================================
// HTTP Handlers for ID Generation
// =============================================
// This file contains the HTTP handlers for generating simple and complex IDs.
// It includes functions to handle requests, generate IDs based on UUIDs, and
// create complex IDs based on specified parameters (length and type).
// =============================================

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
)

type Response struct {
	ID string `json:"id"`
}

func GenerateSimpleID(w http.ResponseWriter, r *http.Request) {
	uuidStr := uuid.NewString()
	response := Response{ID: uuidStr[6:15]}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GenerateComplexID(w http.ResponseWriter, r *http.Request) {
	length := 9
	idType := "alphanumeric"

	queryLength := r.URL.Query().Get("length")
	if queryLength != "" {
		if l, err := strconv.Atoi(queryLength); err == nil {
			length = l
		}
	}

	queryType := r.URL.Query().Get("type")
	if queryType != "" {
		idType = queryType
	}

	response := Response{ID: generateID(length, idType)}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func generateID(length int, idType string) string {
	const (
		numeric      = "0123456789"
		alphabetic   = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	)

	var charset string
	switch idType {
	case "numeric":
		charset = numeric
	case "alphabetic":
		charset = alphabetic
	default:
		charset = alphanumeric
	}

	rand.Seed(time.Now().UnixNano())
	id := make([]byte, length)
	for i := range id {
		id[i] = charset[rand.Intn(len(charset))]
	}
	return string(id)
}
