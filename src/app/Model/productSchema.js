import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Merchant'
      },
  productID: {
    type: String,
    required: true,
    unique: true
  },
  productImages: [{
    type: String,
    required: true
  }],
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  merchantName: {
    type: String,
    required: true
  },
  companyRegionLocation: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 1
  },
  avaliable:{
    type: Boolean,
    default: true
  }
});

// Middleware to auto-generate slug from the product name
productSchema.pre('save', async function(next) {
    if (this.isModified('name') && !this.slug) {
      this.slug = this.name.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9\-]/g, '');
    }
    next();
  });  

const Product = mongoose.model('Product', productSchema);

export default Product;
