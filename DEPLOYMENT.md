# Deployment Guide: Tijuana Sin Barreras

## Prerequisites
- Docker and Docker Compose
- Node.js (v18+) and npm

## 1. Backend Setup
```bash
cd api
cp .env.example .env
# Edit .env with your desired settings
npm install
```

## 2. Database Setup
Run the PostGIS database using Docker:
```bash
# From project root
docker-compose up -d
```

## 3. Running the Backend
```bash
cd api
npm run dev
```
The server will start on `http://localhost:3000`. It will automatically initialize the PostGIS extension and the `barriers` table.

## 4. Frontend Setup
```bash
cd web
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000` (or the port Next.js assigns).

## 5. Summary of Architecture
- **Frontend**: Next.js + Tailwind + Leaflet.
- **Backend**: Express + TypeScript + PostGIS.
- **Database**: PostgreSQL with PostGIS for geospatial queries.
