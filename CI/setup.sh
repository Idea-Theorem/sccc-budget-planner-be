#!/bin/bash
APPENV_PATH=$1

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if python3 is installed, if not, install python3
if ! command_exists python3; then
    echo "Python3 not found. Installing python3..."
    sudo apt-get update
    sudo apt-get install -y python3
fi

# Check if virtualenv is installed, if not, install virtualenv
if ! command_exists virtualenv; then
    echo "Virtualenv not found. Installing virtualenv..."
    sudo apt-get update
    sudo apt-get install -y python3-venv
fi

# Create a virtual environment and activate it
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source ./venv/bin/activate

# Install pip
if ! command_exists pip; then
    echo "Pip not found. Installing pip..."
    python3 -m ensurepip --upgrade
fi

# Install Python app requirements using pip
if [ -f "requirements.txt" ]; then
    echo "Installing app requirements..."
    pip install -r requirements.txt --upgrade
else
    echo "Requirements file 'requirements.txt' not found. Please make sure it exists in the current directory."
fi
