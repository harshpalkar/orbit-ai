FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

RUN pip install -r requirements.txt

# Copy backend source
COPY . .

EXPOSE 10000

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}"]
