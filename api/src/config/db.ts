import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const initDb = async () => {
  const query = `
    CREATE EXTENSION IF NOT EXISTS postgis;

    DO $$ BEGIN
      CREATE TYPE barrier_type AS ENUM ('Broken Sidewalk', 'No Ramp', 'Blocked Passage', 'Other');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      CREATE TYPE barrier_status AS ENUM ('Reported', 'Verified', 'Fixed');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

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

    CREATE INDEX IF NOT EXISTS barriers_location_idx ON barriers USING GIST (location);
  `;
  try {
    await pool.query(query);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
};
