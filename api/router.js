import { Router } from 'express';
import { getUser, updateUser } from './handlers/user.js';

const router = Router();

router.get('/user', getUser);
router.put('/user', updateUser);

export default router;
