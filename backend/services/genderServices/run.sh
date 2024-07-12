#!/bin/bash

NPM_PATH=$(which npm)

if [ -z "$NPM_PATH" ]; then
  echo "Error: npm is not installed or not in the PATH."
  exit 1
fi

if [[ ":$PATH:" != *":$(dirname $NPM_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $NPM_PATH)
fi

npm start