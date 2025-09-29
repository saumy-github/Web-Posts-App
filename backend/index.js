require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a Postgres pool using DATABASE_URL and SSL config for Render compatibility
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// New route to test database connection
app.get('/testdb', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const now = result.rows && result.rows[0] ? result.rows[0].now : null;
    return res.json({ dbTime: now });
  } catch (err) {
    console.error('Error querying database:', err);
    return res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});