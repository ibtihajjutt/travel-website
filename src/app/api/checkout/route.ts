import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Default to mock if keys are missing/test
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'test_key') {
         // Mock response for demo purposes
         return NextResponse.json({ 
             id: "order_mock_" + Date.now(),
             amount: (body.amount || 5000) * 100,
             currency: "USD"
         });
    }

    const options = {
      amount: (body.amount || 100) * 100,
      currency: "USD",
      receipt: "receipt#" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
