#!/bin/bash

# Function to run test script and check its result
run_test() {
    local dir=$1
    local script="test.sh"

    if [ -x "$dir/$script" ]; then
        echo "Running tests in $dir..."
        (cd "$dir" && ./$script)
        local result=$?
        if [ $result -ne 0 ]; then
            echo "Tests failed in $dir"
            exit $result
        else
            echo "Tests passed in $dir"
        fi
    else
        echo "No executable test script found in $dir"
    fi
}

# Array of directories containing test scripts
dirs=(
    "./middleware"
    "./services/ageServices"
    "./services/birthPlaceServices"
    "./services/faceServices"
    "./services/genderServices"
    "./services/nameServices"
    "./services/nationalityServices"
    "./services/uniqueIDServices"
)

# Loop through directories and run tests
for dir in "${dirs[@]}"; do
    run_test "$dir"
done

echo "All tests executed."
