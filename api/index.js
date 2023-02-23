import * as dotenv from 'dotenv';
import config from './config/local.js';
dotenv.config();

import app from './server.js';

app.listen(config.port, () => {
	console.log(`hello on http://localhost:${config.port}`);
});
