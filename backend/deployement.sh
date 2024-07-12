#!/bin/bash

CONFIG_FILE="config.yaml"
PIDS=()
MIDDLEWARE_PID=""

# Function to kill all started processes
cleanup() {
  echo "Killing all started services..."
  for pid in "${PIDS[@]}"; do
    kill "$pid"
  done
  echo "All services have been stopped."

  if [ -n "$MIDDLEWARE_PID" ]; then
    echo "Killing middleware..."
    kill "$MIDDLEWARE_PID"
    echo "Middleware has been stopped."
  fi

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

start_middleware() {
    local file=$1
    local current_dir=$(pwd)

    local path=""
    local setup_script_path=""
    local start_script_path=""

    while IFS= read -r line || [ -n "$line" ]; do
        if [[ $line == *"middleware:"* ]]; then
            while IFS= read -r inner_line || [ -n "$inner_line" ]; do
                if [[ $inner_line == *"path:"* ]]; then
                    path=$(echo "$inner_line" | awk '{print $2}')
                elif [[ $inner_line == *"setup_script_path:"* ]]; then
                    setup_script_path=$(echo "$inner_line" | awk '{print $2}')
                elif [[ $inner_line == *"start_script_path:"* ]]; then
                    start_script_path=$(echo "$inner_line" | awk '{print $2}')
                    absolute_path="${current_dir}${path}"
                    echo "Starting middleware from directory $absolute_path"

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
                    MIDDLEWARE_PID=$!
                    break
                fi
            done
        fi
    done < "$file"
}

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: Configuration file '$CONFIG_FILE' not found."
    exit 1
fi

# Read the configuration file and start the services
read_service_config "$CONFIG_FILE"

# Wait for all background processes to start
wait

# Start the middleware
start_middleware "$CONFIG_FILE"

echo "All services and middleware have been started."

# Wait for all background processes to finish
wait
