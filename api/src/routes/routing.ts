import { Router } from 'express';
import { pool } from '../config/db';

const router = Router();

router.post('/', async (req, res) => {
  const { startLat, startLng, endLat, endLng } = req.body;

  if (!startLat || !startLng || !endLat || !endLng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }

  try {
    // Simplified Routing logic: 
    // In a real scenario, this would use pgRouting or a specialized routing engine.
    // Here we fetch barriers near the straight line between points to mark "dangerous" areas.
    
    const barriersResult = await pool.query(
      `SELECT id, type, ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat 
       FROM barriers 
       WHERE ST_DWithin(location, ST_MakeLine(ST_SetSRID(ST_MakePoint($1, $2), 4326), ST_SetSRID(ST_MakePoint($3, $4), 4326)), 50)`,
      [startLng, startLat, endLng, endLat]
    );

    res.json({
      route: {
        start: { lat: startLat, lng: startLng },
        end: { lat: endLat, lng: endLng },
        status: barriersResult.rows.length > 0 ? 'Barriers detected on route' : 'Route clear',
      },
      barriers: barriersResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
