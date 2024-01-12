// Import the express & mongoose module
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import schemas
import Merchant from './app/Model/merchantSchema.js';
import Product from './app/Model/productSchema.js';
import Customer from './app/Model/customerSchema.js';

const JWT_SECRET = "0ca1d57fcc8e74d72ebce75d23161c9d0174379d762c39306e4234306e463291ea75c24cc146abb35ed93ec390c70a51aaad16d02e2ade893fd277d039606361";
const mongoDBURL = 'mongodb://localhost:27017/promoTourismDB';

// Create an instance of express
const app = express();

mongoose.connect(mongoDBURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Enable CORS
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  credentials: true
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Define the port number
const PORT = process.env.PORT || 4201;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello, this is the PromoTourism Backend Server!');
});

// Customer Registration Route
app.post('/api/customer-register', async (req, res) => {
  try {
      // Check if the user already exists
      let customer = await Customer.findOne({ email: req.body.email });
      if (customer) {
          return res.status(400).send('Customer already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new customer
      customer = new Customer({
          customerID: req.body.customerID,
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
      });

      // Save the customer to the database
      const result = await customer.save();

      // Save the JWT Token to the database
      const { _id } = result;
      const token = jwt.sign({ id: _id }, JWT_SECRET);

      // Send the JWT Token as an HTTP-only cookie
      res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.send({
          message: 'Customer Account created successfully',
      });

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;

    // Determine the model based on userType
    const model = userType === 'customer' ? Customer : userType === 'merchant' ? Merchant : null;
    if (!model) {
      return res.status(400).send('Invalid user type');
    }

    // Find the user by email
    user = await model.findOne({ email: email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // Generate a JWT token
    const tokenPayload = { id: user._id, userType };
    if (userType === 'merchant') {
      tokenPayload.merchantId = user._id; // Include merchantId if the user is a merchant
    }
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      sameSite: req.secure ? 'None' : 'Lax',
      secure: req.secure,
      maxAge: 3600 * 1000 // 1 hour
    };

    // Send the JWT Token as an HTTP-only cookie
    res.cookie('jwt', token, cookieOptions);

    const responseData = { token: token, message: 'Logged in successfully' };
    if (userType === 'merchant') {
      responseData.merchantId = user._id; // Include merchantId in the response
    }

    res.send(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Logout Route (can be just a frontend function to remove token from local storage)
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
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

// Get product by slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({ slug: slug });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.json(product);
  } catch (error) {
    console.error('Error retrieving product by slug:', error);
    res.status(500).send('Internal Server Error');
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
  }
  catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Server error');
  }
});

// Delete product based on the product ID
app.delete('/api/merchants/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Delete images associated with the product
    if (product.productImages && product.productImages.length > 0) {
      product.productImages.forEach(imagePath => {
        const fullPath = path.join(__dirname, imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Product.deleteOne({ _id: productId });

    res.send({ message: 'Product and associated images deleted successfully' });
  } 
  catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Server error');
  }
});

// Get merchant by ID
app.get('/api/merchants/:merchantId', async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const merchant = await Merchant.findById(merchantId);

    if (!merchant) {
      return res.status(404).send('Merchant not found');
    }

    res.json(merchant);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid Merchant ID format');
    }
    res.status(500).send('Error retrieving merchant data: ' + error.message);
  }
});

// Helper function to ensure directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const merchantId = req.params.merchantId;
    const dest = path.join(__dirname, 'assets', 'merchantPictures', merchantId);

    // Ensure the directory exists
    ensureDirectoryExists(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/merchants/:merchantId/uploadImages', upload.array('images'), (req, res) => {
  try {
    const imageUrls = req.files.map(file => {
      // Store only the relative path in the database
      return `/assets/merchantPictures/${req.params.merchantId}/${file.filename}`;
    });
    res.json({ imageUrls: imageUrls });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});
