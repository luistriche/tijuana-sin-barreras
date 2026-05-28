import { pool, initDb } from './config/db';

async function seed() {
  try {
    await initDb();
    
    const sampleBarriers = [
      { type: 'Broken Sidewalk', lat: 32.5147, lng: -117.0382, desc: 'Deep hole in sidewalk' },
      { type: 'No Ramp', lat: 32.5155, lng: -117.0400, desc: 'Entrance to store has no ramp' },
      { type: 'Blocked Passage', lat: 32.5130, lng: -117.0350, desc: 'Construction debris blocking path' },
    ];

    for (const b of sampleBarriers) {
      await pool.query(
        'INSERT INTO barriers (type, location, description) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4)',
        [b.type, b.lng, b.lat, b.desc]
      );
    }
    console.log('Database seeded with sample barriers!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    process.exit();
  }
}

seed();
