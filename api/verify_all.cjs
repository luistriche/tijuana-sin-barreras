const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/tijuana_sin_barreras',
});

async function setup() {
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    await pool.query("CREATE TYPE barrier_type AS ENUM ('Broken Sidewalk', 'No Ramp', 'Blocked Passage', 'Other');");
    await pool.query("CREATE TYPE barrier_status AS ENUM ('Reported', 'Verified', 'Fixed');");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS barriers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type barrier_type NOT NULL,
        location GEOGRAPHY(Point, 4326) NOT NULL,
        description TEXT,
        image_url TEXT,
        reported_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status barrier_status DEFAULT 'Reported',
        user_id UUID
      );
    `);
    console.log('Table created successfully');
    await pool.query('INSERT INTO barriers (type, location, description) VALUES (\'Broken Sidewalk\', ST_SetSRID(ST_MakePoint(-117.0382, 32.5147), 4326), \'Test Barrier JS\')');
    const res = await pool.query('SELECT * FROM barriers WHERE description = \'Test Barrier JS\'');
    console.log('SUCCESS: Found barrier', res.rows[0].id);
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    process.exit();
  }
}
setup();
