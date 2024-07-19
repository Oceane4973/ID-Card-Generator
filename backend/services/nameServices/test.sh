#!/bin/bash
# Navigate to the name services directory
cd "$(dirname "$0")"

# Install dependencies
npm install

npm test
