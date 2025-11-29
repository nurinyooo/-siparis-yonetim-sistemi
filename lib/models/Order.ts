import mongoose, { Schema, Model } from 'mongoose';
import { Order as OrderType } from '@/lib/types';

/**
 * Address Schema
 */
const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'Türkiye' },
}, { _id: false });

/**
 * Customer Schema
 */
const CustomerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, index: true }, // Index for faster duplicate checks
  address: { type: AddressSchema, required: true },
}, { _id: false });

/**
 * Product Schema
 */
const ProductSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  imageUrl: { type: String },
}, { _id: false });

/**
 * Cargo Tracking Schema
 */
const CargoTrackingSchema = new Schema({
  cargoCompany: {
    type: String,
    enum: ['aras', 'mng', 'yurtici', 'ptt', 'ups', 'dhl', 'other'],
    required: true,
  },
  trackingNumber: { type: String, required: true },
  trackingUrl: { type: String },
  estimatedDelivery: { type: Date },
  currentLocation: { type: String },
  lastUpdate: { type: Date },
}, { _id: false });

/**
 * Order Schema
 */
const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true, // Index for faster searches
  },
  customer: { type: CustomerSchema, required: true },
  products: { type: [ProductSchema], required: true },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    index: true, // Index for filtering
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'pending',
  },
  totalAmount: { type: Number, required: true },
  cargoTracking: { type: CargoTrackingSchema },
  notes: { type: String },
  barcode: { type: String },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Index for duplicate order check (phone + createdAt)
OrderSchema.index({ 'customer.phone': 1, createdAt: -1 });

/**
 * Order Model
 */
const Order: Model<OrderType> = mongoose.models.Order || mongoose.model<OrderType>('Order', OrderSchema);

export default Order;