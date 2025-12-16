// jest doesn't recognize dotenv in the app.js. So put it here
import dotenv from 'dotenv'
//give the path relative the cwd of process of jest(when i call npm test from 
//leetcode directory, then that is the cwd)
dotenv.config({ path: 'packages/express_backend_app/.env' });
