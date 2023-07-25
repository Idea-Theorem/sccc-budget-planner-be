VENV_PATH=$1

if [ -e "$VENV_PATH" ]; then
  echo "Activating venv"
    ls $VENV_PATH
    source $VENV_PATH/bin/activate
    echo "Running tests..."
    pytest ./tests
else
  source ./venv/activate
  echo "Running Tests..."
  pytest ./tests
fi