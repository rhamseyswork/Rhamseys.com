#!/bin/bash
#chmod +x test.sh
#./test.sh

# Function to run JavaScript files using Node.js
run_js() {
    node "$1"
    if [ $? -ne 0 ]; then
        echo "Error: JavaScript file $1 failed to run."
    fi
}

# Function to run Python files
run_python() {
    python3 "$1"
    if [ $? -ne 0 ]; then
        echo "Error: Python script $1 failed to run."
    fi
}

# Function to compile and run C++ files
run_cpp() {
    g++ -o "${1%.*}" "$1"
    if [ $? -eq 0 ]; then
        "./${1%.*}"
        if [ $? -ne 0 ]; then
            echo "Error: C++ program $1 returned a non-zero exit status."
        fi
    else
        echo "Error: Compilation of C++ program $1 failed."
    fi
}

# Function to compile and run C++ files
o_run_cpp() {
    cpp_executable="$1"
    ./"$cpp_executable"
    exit_code=$?  # Capture the exit code of the C++ program
    if [ $exit_code -ne 0 ]; then
        echo "Error: C++ executable $cpp_executable returned a non-zero exit status ($exit_code)."
    fi
}

# Function to compile and run Java files
run_java() {
    java_file="$1"
    if [ $? -eq 0 ]; then
        # Compilation successful, now run the Java program
        java_dir=$(dirname "$java_file")
        class_name=$(basename "$java_file" .class)
        cd "$java_dir" || exit 1
        java "$class_name"  # Execute the Java program
        exit_code=$?  # Capture the exit code of the Java program
        if [ $exit_code -ne 0 ]; then
            echo "Error: Java program $class_name returned a non-zero exit status ($exit_code)."
        fi
        cd - > /dev/null  # Return to the previous directory
    else
        echo "Error: Compilation of Java program $java_file failed."
    fi
}

run_java_() {
    java_file="$1"
    javac "$java_file"  # Compile the Java file
    if [ $? -eq 0 ]; then
        # Compilation successful, now run the Java program
        java_dir=$(dirname "$java_file")
        class_name=$(basename "$java_file" .java)
        cd "$java_dir" || exit 1
        java "$class_name"  # Execute the Java program
        exit_code=$?  # Capture the exit code of the Java program
        if [ $exit_code -ne 0 ]; then
            echo "Error: Java program $class_name returned a non-zero exit status ($exit_code)."
        fi
        cd - > /dev/null  # Return to the previous directory
    else
        echo "Error: Compilation of Java program $java_file failed."
    fi
}

# Loop through JavaScript files in js/ directory
for js_file in js/test.js; do
    run_js "$js_file"
done

# Loop through Python files in py/ directory
for py_file in py/test.py; do
    run_python "$py_file"
done

# Run C++ file directly (assuming it's in the current directory)
cpp_file="cpp/test/test_.cpp"
if [ -f "$cpp_file" ]; then
    run_cpp "$cpp_file"
else
    echo "Error: C++ file '$cpp_file' not found."
fi

# Check if the C++ executable exists and is executable
cpp_executable="cpp/test/test"
if [ -x "$cpp_executable" ]; then
    o_run_cpp "$cpp_executable"
else
    echo "Error: C++ executable '$cpp_executable' not found or not executable."
fi

# Check if the Java file exists
java_file="java/test.class"
if [ -f "$java_file" ]; then
    run_java "$java_file"
else
    echo "Error: Java file '$java_file' not found."
fi

# Check if the Java file exists
java_file="java/test_.java"
if [ -f "$java_file" ]; then
    run_java_ "$java_file"
else
    echo "Error: Java file '$java_file' not found."
fi