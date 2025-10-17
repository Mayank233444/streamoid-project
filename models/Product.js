const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku: {
    type: String,
    required: [true, 'SKU is required'], 
    unique: true, 
    trim: true 
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative'] 
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  }
}, {
  timestamps: true
});

ProductSchema.index({ brand: 1 });
ProductSchema.index({ color: 1 });
ProductSchema.index({ price: 1 });


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;