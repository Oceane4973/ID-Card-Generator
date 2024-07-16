#!/bin/bash

# Chemin vers python3
PYTHON_PATH=$(which python3)

if [ -z "$PYTHON_PATH" ]; then
  echo "Error: python3 is not installed or not in the PATH."
  exit 1
fi

# Vérifier si le chemin de python3 est dans le PATH
if [[ ":$PATH:" != *":$(dirname $PYTHON_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $PYTHON_PATH)
fi

# Activer l'environnement virtuel
source .venv/bin/activate

# Exécuter l'application
echo "Running application"
python3 src/main.py
