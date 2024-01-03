// Import the express & mongoose module
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import schemas
import Merchant from './app/Model/merchantSchema.js';
import Product from './app/Model/productSchema.js';

const mongoDBURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/promoTourismDB'; // modify this to your MongoDB URL
mongoose.connect(mongoDBURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Create an instance of express
const app = express();

// Enable CORS
app.use(cors());

// Define the port number
const PORT = process.env.PORT || 4201;

app.use(bodyParser.json());

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello, this is the PromoTourism Backend Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test Upload Merchant API Status
app.post('/api/merchants/new', async (req, res) => {
  try {
    const newMerchant = new Merchant(req.body);
    await newMerchant.save();
    res.status(201).send(newMerchant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find all merchants with sensitive information
app.get('/api/merchants', async (req, res) => {
  try {
    const { username, password } = req.query;

    // Check if the provided username and password match the expected values
    if (username === 'MinistryAccount' && password === 'ministry123$') {
      const merchants = await Merchant.find({}, '-password'); // Exclude the password field

      res.status(200).json(merchants);
    } else {
      // If the credentials do not match, return an error or an empty response
      res.status(403).json({ message: 'Unauthorized access' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find all merchants without sensitive information
app.get('/api/merchants/verified', async (req, res) => {
  try {
    // Find merchants where accountStatus is "Verified"
    const verifiedMerchants = await Merchant.find({ accountStatus: "Verified" }, '_id name slug companyRegionLocation companyDetails');

    res.status(200).json(verifiedMerchants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Find all products for a specific merchant
app.get('/api/merchants/products', async (req, res) => {
  try {
    const merchantId = req.query.merchantId; // Retrieve the merchant ID from query parameter

    if (!merchantId) {
      return res.status(400).send('Merchant ID is required');
    }

    const products = await Product.find({ merchant: merchantId });

    res.status(200).json(products);
  } catch (error) {
    // Error handling for invalid ObjectId format and other errors
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid Merchant ID format');
    }
    res.status(500).send('Error retrieving products: ' + error.message);
  }
});

// Find all products
app.get('/api/merchants/all-products', async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products: ' + error.message });
  }
});


// Define the route to add product
app.post('/api/merchants/products/new', async (req, res) => {
  try {
    const { merchantId, productDetails } = req.body;
    
    // Find the merchant by ID
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res.status(404).send('Merchant not found');
    }

    // Check if the merchant is verified
    if (merchant.accountStatus !== 'Verified') {
      return res.status(403).send('Merchant is not verified, Cannot add products');
    }

    // Create and save the new product
    const newProduct = new Product({
      ...productDetails,
      merchant: merchantId,
      merchantName: merchant.name,
      companyRegionLocation: merchant.companyRegionLocation,
    });
    await newProduct.save();

    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(500).send('Error adding product: ' + error.message);
  }
});