const express = require('express')
import { adminAuth } from '../middlewares/adminAuth';


const router = express.Router();    
router.get('/admin-protected',adminAuth)
export default router;