import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  companyRegionLocation:{
    type: String,
    required: true
  },
  companyDetails: {
    type: String,
    required: true
  },
  accountStatus: {
    type: String,
    default: 'Pending'
  },
  documents: [{
    type: String, 
    required: true
  }],
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

// Password hashing middleware
merchantSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Middleware to auto-generate slug from the merchant name
merchantSchema.pre('save', async function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9\-]/g, '');
  }
  next();
});  

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
