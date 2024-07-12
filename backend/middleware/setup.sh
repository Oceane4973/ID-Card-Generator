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
    npm install chai chai-http mocha --save-dev
else
    echo "npm init -y already executed"
fi

if [ -f "package.json" ]; then
    # Update or add the "main" entry
    if grep -q '"main":' package.json; then
        sed -i 's#"main": "[^"]*"#"main": "src/index.js"#' package.json
    else
        sed -i '/^{/a \  "main": "src/index.js",' package.json
    fi

    if grep -q '"type":' package.json; then
        sed -i 's#"type": "[^"]*"#"type": "module"#' package.json
    else
        sed -i '/^{/a \  "type": "module",' package.json
    fi

    # Update or add the "start" script
    if grep -q '"start":' package.json; then
        sed -i 's#"start": "[^"]*"#"start": "node src/index.js"#' package.json
    else
        sed -i '/"scripts": {/a \    "start": "node src/index.js",' package.json
    fi

    # Update or add the "test" script
    if grep -q '"test":' package.json; then
        sed -i 's#"test": "[^"]*"#"test": "mocha tests/\*\*/\*.test.js"#' package.json
    else
        sed -i '/"scripts": {/a \    "test": "mocha tests/\*\*/\*.test.js",' package.json
    fi
fi