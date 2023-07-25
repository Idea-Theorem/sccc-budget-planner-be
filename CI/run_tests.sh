VENV_PATH=$1

if [ -e "$VENV_PATH" ]; then
    echo "Env Path Found: $VENV_PATH"
    echo "Activating venv"
    source $VENV_PATH/bin/activate
    pip freeze
    echo "Running tests..."
    pytest ./tests
else
  source ./venv/activate
  echo "Running Tests..."
  pytest ./tests
fi