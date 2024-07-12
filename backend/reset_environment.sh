#!/bin/bash


if [[ $EUID -ne 0 ]]; then
   echo "This script must be run with administrator privileges (sudo)." 
   exit 1
fi

find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

find . -name "package.json" -type f -exec rm -f '{}' +


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
