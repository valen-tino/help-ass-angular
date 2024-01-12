import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const customerSchema = new mongoose.Schema({
  customerID: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  password: { type: String, required: true },
  address: String,
  phoneNumber: String,
  registeredDate: { type: Date, default: Date.now },
  purchaseHistory: [{ type: String }],
  reviews: [{
    productID: String,
    rating: Number,
    text: String
  }],
  accountStatus: { type: String, default: 'Active' }
});

// Password hashing middleware
customerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Changed salt rounds to 10
  }
  next();
});

const Customer = mongoose.model('Customer', customerSchema); // Fixed the model name

export default Customer;

