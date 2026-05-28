# Technical Specification: Tijuana Sin Barreras

## 1. System Architecture
The system follows a client-server architecture.
- **Client**: Next.js (React) web application focusing on accessibility (WCAG 2.1).
- **Server**: Node.js with TypeScript and Express.
- **Database**: PostgreSQL with PostGIS for geospatial data.

## 2. Data Models

### Barrier
- `id`: UUID (Primary Key)
- `type`: Enum (Broken Sidewalk, No Ramp, Blocked Passage, etc.)
- `location`: Geography(Point, 4326) - PostGIS point
- `description`: Text
- `image_url`: String (URL to storage)
- `reported_at`: Timestamp
- `status`: Enum (Reported, Verified, Fixed)
- `user_id`: UUID (Optional)

### Route
- `id`: UUID
- `start_point`: Geography(Point, 4326)
- `end_point`: Geography(Point, 4326)
- `path`: Geography(LineString, 4326)
- `accessibility_score`: Float

## 3. API Endpoints

### Barriers
- `POST /api/barriers`: Report a new barrier.
- `GET /api/barriers?lat=...&lng=...&radius=...`: Get barriers in a specific area.
- `PATCH /api/barriers/:id`: Update barrier status (for moderators).

### Routing
- `POST /api/route`: Calculate an accessible route between two points, avoiding known barriers.

## 4. Routing Algorithm logic
The routing engine will:
1. Fetch the shortest path using standard OSM/Mapbox data.
2. Identify barriers intersecting or near the path.
3. Calculate "penalty" weights for segments with barriers.
4. Re-route using Dijkstra or A* to find the path with the lowest penalty (highest accessibility).

## 5. Accessibility Requirements
- High contrast mode.
- Screen reader compatibility (ARIA labels).
- Large touch targets for mobile users.
- Voice-to-text reporting.
