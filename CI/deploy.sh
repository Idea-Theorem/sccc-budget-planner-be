#!/bin/bash

# Specify the desired version of Azure CLI
targeted_version="2.50.0"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Azure CLI is installed
if ! command_exists az; then
    echo "Azure CLI not found. Installing Azure CLI..."
    
    # Install required dependencies
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl apt-transport-https lsb-release gnupg

    # Download and install Azure CLI
    curl -sL https://packages.microsoft.com/keys/microsoft.asc |
        gpg --dearmor |
        sudo tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg >/dev/null
    AZ_REPO=$(lsb_release -cs)
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" |
        sudo tee /etc/apt/sources.list.d/azure-cli.list
    sudo apt-get update
    sudo apt-get install -y azure-cli=$desired_az_cli_version
fi

# Check if az webapp command is available
if ! command_exists az webapp; then
    echo "az webapp not found. Installing Azure webapp extension..."

    # Install Azure webapp extension
    az extension add --name webapp
fi

echo "Azure CLI and az webapp are installed and available."

echo "Login into Azure"
az login --service-principal --tenant $(AZ_TENANT) --username $(AZ_USER) --password $(AZ_PWD)

echo "Deploy App To Azure"
az webapp up --runtime PYTHON:3.9 --sku F1 --name $(WEB_APP_NAME) --resource-group $(RSC_GROUP)