const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/tijuana_sin_barreras',
});

async function test() {
  try {
    await pool.query('INSERT INTO barriers (type, location, description) VALUES (\'Broken Sidewalk\', ST_SetSRID(ST_MakePoint(-117.0382, 32.5147), 4326), \'Test Barrier JS\')');
    const res = await pool.query('SELECT * FROM barriers WHERE description = \'Test Barrier JS\'');
    console.log('SUCCESS: Found barrier', res.rows[0].id);
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    process.exit();
  }
}
test();
