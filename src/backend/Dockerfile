FROM python:3.10-slim

WORKDIR /app

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

COPY pyproject.toml poetry.lock ./
RUN pip install poetry
RUN poetry install --no-dev

COPY . .

ENV PYTHONPATH="/app"

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "daatelli.main:create_app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]

