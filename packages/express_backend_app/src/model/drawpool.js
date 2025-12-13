const { Pool } = require('pg');

module.exports = new Pool({
  host:process.env.PG_HOST,
  user:process.env.PG_USER,
  database:process.env.PG_DB,
  password:process.env.PG_PASS,
  port:process.env.PG_PORT 
})
