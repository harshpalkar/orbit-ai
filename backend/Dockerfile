# Build frontend first
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/orbit-frontend/ .
RUN npm install && npm run build

# Backend build
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Copy backend + frontend build output
COPY backend/ .
COPY --from=frontend /app/frontend/dist/orbit-frontend /app/static

EXPOSE 10000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}"]
