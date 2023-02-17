import express, { Router } from 'express';
import peoplesRoutes from './peoples.routes'

const router: Router = express.Router();

router.use('/peoples', peoplesRoutes);

export default router;
