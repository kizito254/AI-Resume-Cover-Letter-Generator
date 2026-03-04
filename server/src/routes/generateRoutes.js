import { Router } from 'express';
import { generateCoverLetter, generateResume } from '../controllers/generateController.js';

const router = Router();

router.post('/resume', generateResume);
router.post('/cover-letter', generateCoverLetter);

export default router;
