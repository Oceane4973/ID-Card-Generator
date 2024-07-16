#!/bin/bash

PYTHON_PATH=$(which python3)

if [ -z "$PYTHON_PATH" ]; then
  echo "Error: python3 is not installed or not in the PATH."
  exit 1
fi

if [[ ":$PATH:" != *":$(dirname $PYTHON_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $PYTHON_PATH)
fi

if [ ! -f "requirements.txt" ]; then
    echo "Creating requirements.txt"
    touch requirements.txt
    echo "Flask" >> requirements.txt
    echo "python-dotenv" >> requirements.txt
    echo "requests" >> requirements.txt
    echo "imageio" >> requirements.txt
fi

echo "Installing dependencies"
pip install -r requirements.txt

if [ ! -d "src" ]; then
    echo "Creating src directory"
    mkdir src
fi

if [ ! -f "src/main.py" ]; then
    echo "Creating src/main.py"
    touch src/main.py
    echo 'print("Hello, World!")' >> src/main.py
fi

echo "Setup complete"
