"use strict";
// This mock will be hoisted to the top when called by jest mocktest
const { Pool } = require('pg');
module.exports = new Pool({
    host: "localhost",
    user: "mock",
    database: "mock",
    password: "mock",
    port: 5432
});
//# sourceMappingURL=drawpool.js.map