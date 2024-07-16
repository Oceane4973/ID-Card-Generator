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

# Créer un environnement virtuel
if [ ! -d ".venv" ]; then
  echo "Creating virtual environment"
  python3 -m venv .venv
fi

# Activer l'environnement virtuel
source .venv/bin/activate

# Créer requirements.txt si non existant
if [ ! -f "requirements.txt" ]; then
    echo "Creating requirements.txt"
    touch requirements.txt
    echo "Flask" >> requirements.txt
    echo "python-dotenv" >> requirements.txt
    echo "requests" >> requirements.txt
    echo "imageio" >> requirements.txt
fi

# Installer les dépendances
echo "Installing dependencies"
pip install -r requirements.txt

# Créer le répertoire src si non existant
if [ ! -d "src" ]; then
    echo "Creating src directory"
    mkdir src
fi

# Créer src/main.py si non existant
if [ ! -f "src/main.py" ]; then
    echo "Creating src/main.py"
    touch src/main.py
    echo 'print("Hello, World!")' >> src/main.py
fi

echo "Setup complete"
