/**
 * Sipariş Durumu Enum
 * Siparişin mevcut aşamasını temsil eder
 */
export type OrderStatus =
  | 'pending'        // Beklemede
  | 'preparing'      // Hazırlanıyor
  | 'shipped'        // Kargolandı
  | 'delivered'      // Teslim Edildi
  | 'cancelled';     // İptal Edildi

/**
 * Kargo Firması Enum
 * Desteklenen kargo şirketleri
 */
export type CargoCompany =
  | 'aras'
  | 'mng'
  | 'yurtici'
  | 'ptt'
  | 'ups'
  | 'dhl'
  | 'other';

/**
 * Ödeme Durumu
 */
export type PaymentStatus =
  | 'paid'           // Ödendi
  | 'pending'        // Beklemede
  | 'refunded';      // İade Edildi

/**
 * Müşteri Bilgileri Interface
 */
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

/**
 * Adres Bilgileri Interface
 */
export interface Address {
  street: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}

/**
 * Ürün Bilgileri Interface
 */
export interface Product {
  id: string;
  name: string;
  sku: string;          // Stok Kodu
  price: number;
  quantity: number;
  imageUrl?: string;
}

/**
 * Kargo Takip Bilgileri Interface
 */
export interface CargoTracking {
  cargoCompany: CargoCompany;
  trackingNumber: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
  currentLocation?: string;
  lastUpdate?: Date;
}

/**
 * Sipariş Interface (Ana Veri Modeli)
 */
export interface Order {
  id: string;
  orderNumber: string;      // Sipariş numarası (örn: ORD-2024-0001)
  customer: Customer;
  products: Product[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  cargoTracking?: CargoTracking;
  notes?: string;
  barcode?: string;         // Sipariş için üretilen barkod
}

/**
 * Dashboard İstatistikleri Interface
 */
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  todayOrders: number;
}

/**
 * Filtreleme Seçenekleri Interface
 */
export interface OrderFilters {
  status?: OrderStatus | 'all';
  searchQuery?: string;      // Müşteri adı veya sipariş numarası
  dateFrom?: Date;
  dateTo?: Date;
  cargoCompany?: CargoCompany | 'all';
}

/**
 * Kargo Firması Bilgileri
 */
export interface CargoCompanyInfo {
  id: CargoCompany;
  name: string;
  trackingUrlTemplate: string;  // {trackingNumber} placeholder ile
  logo?: string;
}