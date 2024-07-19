#!/bin/bash
# Navigate to the face services directory
cd "$(dirname "$0")"

# Activer l'environnement virtuel
source .venv/bin/activate

# Run tests
pytest tests/test.py
