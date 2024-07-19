package handler

// handler_test.go
// =============================================
// Unit Tests for ID Handlers
// =============================================
// This file contains unit tests for the HTTP handlers defined in id_handler.go.
// It tests the functionality of generating simple and complex IDs, ensuring
// that the IDs are generated correctly according to the specifications.
// =============================================

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGenerateSimpleID(t *testing.T) {
	req, err := http.NewRequest("GET", "/id/simple", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GenerateSimpleID)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var response Response
	err = json.NewDecoder(rr.Body).Decode(&response)
	if err != nil {
		t.Errorf("error decoding response: %v", err)
	}

	if response.ID == "" {
		t.Errorf("expected a non-empty ID, got '%v'", response.ID)
	}
}

func TestGenerateComplexID(t *testing.T) {
	req, err := http.NewRequest("GET", "/id/complex?length=10&type=numeric", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GenerateComplexID)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var response Response
	err = json.NewDecoder(rr.Body).Decode(&response)
	if err != nil {
		t.Errorf("error decoding response: %v", err)
	}

	if response.ID == "" {
		t.Errorf("expected a non-empty ID, got '%v'", response.ID)
	}

	if len(response.ID) != 10 {
		t.Errorf("expected ID of length 10, got '%v'", len(response.ID))
	}

	for _, char := range response.ID {
		if char < '0' || char > '9' {
			t.Errorf("expected numeric ID, got '%v'", response.ID)
			break
		}
	}
}
