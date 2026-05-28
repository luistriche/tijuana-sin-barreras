# Tijuana Sin Barreras

## Project Overview
A real-time accessible routing platform designed to improve mobility for people with motor disabilities, the elderly, and families in Tijuana. The goal is to create a "living map" of the city where users can plan safe trajectories and report physical barriers.

## Core Features
- **Accessible Routing**: Real-time pathfinding that avoids reported barriers and prioritizes accessible infrastructure.
- **Barrier Reporting**: Community-driven reporting system allowing users to upload photos and GPS coordinates of physical obstacles (broken sidewalks, lack of ramps, etc.).
- **Interactive Living Map**: A dynamic visualization of city accessibility levels.
- **Multimodal Integration**: Support for various mobility needs (wheelchairs, strollers, walkers).

## Proposed Technical Stack
- **Frontend**: Next.js / React (Web) or React Native (Mobile) for high accessibility and performance.
- **Backend**: Node.js with TypeScript and Express/FastAPI.
- **Database**: PostgreSQL with **PostGIS** extension for advanced geospatial queries and routing.
- **Maps**: Mapbox or Google Maps API for rendering and routing.
- **Storage**: Cloud storage for images of reported barriers.

## Project Structure
- `/api`: Backend services, database schemas, and API endpoints.
- `/web`: Frontend application and UI components.
- `/docs`: Technical specifications, architectural diagrams, and user stories.

## Roadmap
- [ ] Initial Project Setup & Architecture Design
- [ ] Database Schema Design (PostGIS)
- [ ] Basic Map Integration & Route Visualization
- [ ] Barrier Reporting System Implementation
- [ ] Accessibility-aware Routing Algorithm
- [ ] UI/UX Testing with accessibility standards (WCAG)
