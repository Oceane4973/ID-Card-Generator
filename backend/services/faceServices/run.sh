#!/bin/bash

PYTHON_PATH=$(which python3)

if [ -z "$PYTHON_PATH" ]; then
  echo "Error: python3 is not installed or not in the PATH."
  exit 1
fi

if [[ ":$PATH:" != *":$(dirname $PYTHON_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $PYTHON_PATH)
fi

echo "Running application"
python3 src/main.py
