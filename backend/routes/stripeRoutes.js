import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  getStripeConfig,
} from '../controllers/stripeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/config', getStripeConfig);

// Protected routes (temporarily made public for testing)
router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-payment', confirmPayment);

export default router;
