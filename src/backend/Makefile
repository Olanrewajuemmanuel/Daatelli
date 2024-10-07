# Variables
PROJECT_NAME := daatelli
APP_NAME := core
UVICORN := uvicorn                 
PYTHON := py                 
POETRY := pip install poetry && $(PYTHON) -m poetry            
REQUIREMENTS := pyproject.toml
PORT := 8000                       
HOST := 127.0.0.1                  
DOCKER := docker
version ?= 0.1.0

# Run the FastAPI app using Uvicorn (development mode)
run:
	$(UVICORN) $(APP_NAME).main:create_app --reload --host $(HOST) --port $(PORT)

install:
	$(POETRY) install

test:
	$(PYTHON) -m pytest

format:
	$(PYTHON) -m black .

clean:
	@echo "Cleaning Python cache..."
	@if [ -d "__pycache__" ]; then rm -r __pycache__; else echo "No __pycache__ directory found."; fi
	@echo "Python cache cleaned."

# Build Docker image
docker-build:
	$(DOCKER) build -t $(PROJECT_NAME)-backend:$(version) .


# List available commands
help:
	@echo "Available Makefile commands:"
	@echo "  run            - Run FastAPI app in development mode"
	@echo "  install        - Install Python dependencies"
	@echo "  test           - Run tests with pytest"
	@echo "  format         - Format code with Black"
	@echo "  clean          - Clean Python cache files"
	@echo "  docker-build   - Build Docker image"
