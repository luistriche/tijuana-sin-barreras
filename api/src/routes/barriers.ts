import { Router } from 'express';
import { pool } from '../config/db';

const router = Router();

// Report a new barrier
router.post('/', async (req, res) => {
  const { type, lat, lng, description, imageUrl } = req.body;

  if (!type || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Missing required fields: type, lat, lng' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO barriers (type, location, description, image_url) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4, $5) RETURNING *',
      [type, lng, lat, description, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get barriers in a radius
router.get('/', async (req, res) => {
  const { lat, lng, radius = 1000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng' });
  }

  try {
    const result = await pool.query(
      `SELECT id, type, ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat, description, image_url, status, reported_at 
       FROM barriers 
       WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3)`,
      [lng, lat, radius]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
