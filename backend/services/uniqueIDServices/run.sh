#!/bin/bash

# run.sh
# =============================================
# Run Script for Go Application
# =============================================
# This script runs the Go application. It ensures that Go is available in
# the PATH and then starts the Go server defined in the src/main.go file.
# =============================================

GO_PATH=$(which go)

if [ -z "$GO_PATH" ]; then
  echo "Go is not installed. Installing Go..."
  wget https://dl.google.com/go/go1.20.3.linux-amd64.tar.gz

  sudo tar -C /usr/local -xzf go1.20.3.linux-amd64.tar.gz

  rm go1.20.3.linux-amd64.tar.gz

  export PATH=$PATH:/usr/local/go/bin
  echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.profile

  source ~/.profile

  GO_PATH=$(which go)
  if [ -z "$GO_PATH" ]; then
    echo "Error: Go installation failed."
    exit 1
  fi

else
  echo "Go is already installed."
fi

go get github.com/google/uuid

go test ./src/...

go run src/main.go

