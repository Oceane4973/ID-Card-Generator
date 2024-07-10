#!/bin/bash

# Trouver l'emplacement de npm et l'ajouter au PATH si nécessaire
NPM_PATH=$(which npm)

if [ -z "$NPM_PATH" ]; then
  echo "Error: npm is not installed or not in the PATH."
  exit 1
fi

# Ajouter l'emplacement de npm au PATH si nécessaire
if [[ ":$PATH:" != *":$(dirname $NPM_PATH):"* ]]; then
  export PATH=$PATH:$(dirname $NPM_PATH)
fi

CONFIG_FILE="config.yaml"
PIDS=()

# Function to kill all started processes
cleanup() {
  echo "Killing all started services..."
  for pid in "${PIDS[@]}"; do
    kill "$pid"
  done
  echo "All services have been stopped."
  exit 0
}

# Trap SIGINT and SIGTERM to call cleanup
trap cleanup SIGINT SIGTERM

read_service_config() {
    local file=$1
    local current_dir=$(pwd)

    local service_name=""
    local path=""
    local start_command=""

    while IFS= read -r line || [ -n "$line" ]; do
        if [[ $line == *"path:"* ]]; then
            path=$(echo "$line" | awk '{print $2}')
            absolute_path="${current_dir}${path}"
        fi
        if [[ $line == *"name:"* ]]; then
            service_name=$(echo "$line" | awk '{print $3}')
        fi
        if [[ $line == *"start_command:"* ]]; then
            start_command=$(echo "$line" | awk -F': ' '{print $2}')
            echo $start_command
            echo "Starting $service_name service from directory $absolute_path"
            (cd "$absolute_path" && command npm start) &
            PIDS+=($!)
        fi
    done < "$file"
}

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: Configuration file '$CONFIG_FILE' not found."
    exit 1
fi

# Read the configuration file and start the services
read_service_config "$CONFIG_FILE"

echo "All services have been started."

# Wait for all background processes to finish
wait
