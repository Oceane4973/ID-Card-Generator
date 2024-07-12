#!/bin/bash

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
    local setup_script_path=""
    local start_script_path=""

    while IFS= read -r line || [ -n "$line" ]; do
        if [[ $line == *"name:"* ]]; then
            service_name=$(echo "$line" | awk '{print $2}')
        elif [[ $line == *"setup_script_path:"* ]]; then
            setup_script_path=$(echo "$line" | awk '{print $2}')
        elif [[ $line == *"start_script_path:"* ]]; then
            start_script_path=$(echo "$line" | awk '{print $2}')
            echo "Starting $service_name service from directory $absolute_path"

            (
              cd "$absolute_path" || exit

              # Make scripts executable
              chmod +x "$setup_script_path"
              chmod +x "$start_script_path"

              # Execute setup script
              echo "Executing setup script: $setup_script_path"
              ./"$setup_script_path"

              # Execute start script
              echo "Executing start script: $start_script_path"
              ./"$start_script_path"
            ) &
            PIDS+=($!)
        elif [[ $line == *"path:"* ]]; then
            path=$(echo "$line" | awk '{print $2}')
            absolute_path="${current_dir}${path}"
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
