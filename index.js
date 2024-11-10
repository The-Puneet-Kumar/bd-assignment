const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

//Calculate total price of item in cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartPrice = cartTotal + newItemPrice;

  res.send(`Total Cart Value: ${totalCartPrice}`);
});

// Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';
  if (isNaN(cartTotal)) {
    return res.status(400).send('Invalid cartTotal value');
  }
  const discountPercentage = isMember ? 0.1 : 0;
  const discountAmount = cartTotal * discountPercentage;
  const finalPrice = cartTotal - discountAmount;
  res.send(finalPrice.toString());
});

// Calculate tax on the cart total
// Define the tax rate (e.g., 5% tax)
const TAX_RATE = 0.05; // 5%
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  // Calculate tax
  const taxAmount = cartTotal * TAX_RATE;
  res.send(taxAmount.toString());
});

//Estimate delivery time on the basis of shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryDays;
  // Calculate delivery days based on the shipping method
  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send('Invalid shipping method');
  }
  res.send(`Estimated delivery time: ${deliveryDays} days`);
});

//calculate shipping cost due to weight distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  // Calculate the shipping cost using the formula given
  let shippingCost = weight * distance * 0.1;
  res.send(`Shipping Cost: ${shippingCost}`);
});

//calculate loyality by doing purchase point
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  if (isNaN(purchaseAmount)) {
    return res.status(400).send('Invalid purchaseAmount value');
  }
  const loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
