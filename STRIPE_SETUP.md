# Stripe Payment Integration Setup

## Environment Variables Setup

### Frontend (.env file in `/frontend/` directory)

Create a `.env` file in the frontend directory with the following content:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration
REACT_APP_API_URL=https://e-commerce-e0of.onrender.com
```

### Backend (.env file in `/backend/` directory)

Add these variables to your existing `.env` file in the backend directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
```

## How to Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Make sure you're in **Test mode** (toggle in the top left)
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

## Testing the Integration

1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm start`
3. Go through the checkout process
4. Select "Stripe" as payment method
5. Use test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - **3D Secure**: 4000 0025 0000 3155

## Test Card Details

- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## Features Included

✅ Modern payment method selection UI
✅ Stripe Elements integration
✅ Secure payment processing
✅ Error handling and validation
✅ Success/error notifications
✅ Responsive design with animations
✅ PayPal integration (existing)
✅ Both payment methods in checkout flow

## Security Notes

- Never commit your `.env` files to version control
- Use test keys for development
- Switch to live keys only in production
- Always validate payments on the backend
