import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

import { signin } from './handlers/user.js';
import { protect } from './modules/auth.js';
import router from './router.js';
import { errors } from './handlers/errors.js';

const app = express();

// Settings for reading and parsing data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', protect, router);
app.post('/signin', signin);
app.use(errors);

export default app;
