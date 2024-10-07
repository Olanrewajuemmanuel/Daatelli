FROM python:3.10-slim

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN pip install poetry
RUN poetry install --no-dev
# Check if uvicorn is installed
RUN which uvicorn

COPY . .

ENV PYTHONPATH="/app"

EXPOSE 8000

CMD ["uvicorn", "core.main:create_app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]

