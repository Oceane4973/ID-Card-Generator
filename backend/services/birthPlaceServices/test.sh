#!/bin/bash
# Navigate to the birthplace services directory
cd "$(dirname "$0")"

# Install dependencies
npm install

# Run Jest tests
npm test