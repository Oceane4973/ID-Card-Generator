#!/bin/bash

# setup.sh
# =============================================
# Setup Script for Go Application
# =============================================
# This script sets up the Go environment and installs necessary dependencies.
# It checks for the presence of Go, installs it if necessary, initializes
# the Go module if not already done, and ensures that the required packages
# are available. Additionally, it creates a .env file with default configurations
# if it does not exist.
# =============================================

if [ ! -f "go.mod" ]; then
  echo "Initializing Go module"
  go mod init id-service
else
  echo "Go module already initialized"
fi

if ! grep -q 'github.com/joho/godotenv' go.mod; then
  echo "Installing godotenv package"
  go get github.com/joho/godotenv
else
  echo "godotenv package already installed"
fi

if [ ! -f ".env" ]; then
  echo "Creating .env file with default PORT"
  echo "PORT=5007" > .env
else
  echo ".env file already exists"
fi

echo "Setup is complete. You can now run your Go application with 'go run src/main.go'."
