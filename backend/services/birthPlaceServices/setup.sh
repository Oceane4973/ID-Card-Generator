#!/bin/bash

NPM_PATH=$(which npm)

if [ -z "$NPM_PATH" ]; then
  echo "Error: npm is not installed or not in the PATH."
  exit 1
fi

if [[ ":$PATH:" != *":$(dirname $NPM_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $NPM_PATH)
fi

if [ ! -f "package.json" ]; then
    echo "Executing npm init -y"
    npm init -y
    npm install axios dotenv express

    if [ -f "package.json" ]; then
        if grep -q '"main":' package.json; then
            sed -i 's#"main": "[^"]*"#"main": "src/index.js"#' package.json
        else
            sed -i '/^{/a \  "main": "src/index.js",' package.json
        fi
        if grep -q '"start":' package.json; then
            sed -i 's#"start": "[^"]*"#"start": "node src/index.js"#' package.json
        else
            sed -i '/"scripts": {/a \    "start": "node src/index.js",' package.json
        fi
    fi
else
    echo "npm init -y already executed"
    npm install 
fi
