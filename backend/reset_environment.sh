#!/bin/bash

START_PORT=5001
END_PORT=5008

for PORT in $(seq $START_PORT $END_PORT); do

  PIDS=$(lsof -t -i:$PORT)

  if [ -z "$PIDS" ]; then
    echo "No processes found using port $PORT."
  else
    echo "Killing processes using port $PORT: $PIDS"
    kill -9 $PIDS
  fi
done
