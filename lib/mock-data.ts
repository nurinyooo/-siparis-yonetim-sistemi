import { Order, Customer, Product, DashboardStats, CargoCompanyInfo } from './types';
import { generateBarcode } from './utils';

/**
 * Mock Müşteriler
 */
export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '0532 123 4567',
    address: {
      street: 'Atatürk Caddesi No:123 Daire:5',
      city: 'İstanbul',
      district: 'Kadıköy',
      postalCode: '34710',
      country: 'Türkiye',
    },
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@example.com',
    phone: '0533 987 6543',
    address: {
      street: 'İnönü Bulvarı No:45 Kat:3',
      city: 'Ankara',
      district: 'Çankaya',
      postalCode: '06100',
      country: 'Türkiye',
    },
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@example.com',
    phone: '0534 555 1234',
    address: {
      street: 'Cumhuriyet Mahallesi 250. Sokak No:8',
      city: 'İzmir',
      district: 'Konak',
      postalCode: '35250',
      country: 'Türkiye',
    },
  },
];

/**
 * Mock Siparişler
 */
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-0001',
    customer: mockCustomers[0],
    products: [
      {
        id: 'p1',
        name: 'Laptop',
        sku: 'LAP-001',
        price: 25000,
        quantity: 1,
      },
      {
        id: 'p2',
        name: 'Wireless Mouse',
        sku: 'MOU-002',
        price: 350,
        quantity: 2,
      },
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    totalAmount: 25700,
    createdAt: new Date('2024-11-20T10:30:00'),
    updatedAt: new Date('2024-11-22T14:20:00'),
    cargoTracking: {
      cargoCompany: 'aras',
      trackingNumber: '1234567890123',
      estimatedDelivery: new Date('2024-11-28T18:00:00'),
      currentLocation: 'İstanbul Anadolu Transfer Merkezi',
      lastUpdate: new Date('2024-11-22T14:20:00'),
    },
    barcode: generateBarcode('1'),
    notes: 'Müşteri adrese teslim istiyor.',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-0002',
    customer: mockCustomers[1],
    products: [
      {
        id: 'p3',
        name: 'Mekanik Klavye',
        sku: 'KEY-003',
        price: 1500,
        quantity: 1,
      },
    ],
    status: 'preparing',
    paymentStatus: 'paid',
    totalAmount: 1500,
    createdAt: new Date('2024-11-25T09:15:00'),
    updatedAt: new Date('2024-11-25T09:15:00'),
    barcode: generateBarcode('2'),
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-0003',
    customer: mockCustomers[2],
    products: [
      {
        id: 'p4',
        name: 'USB-C Hub',
        sku: 'HUB-004',
        price: 450,
        quantity: 3,
      },
      {
        id: 'p5',
        name: 'HDMI Kablo 2m',
        sku: 'CAB-005',
        price: 120,
        quantity: 2,
      },
    ],
    status: 'pending',
    paymentStatus: 'paid',
    totalAmount: 1590,
    createdAt: new Date('2024-11-26T16:45:00'),
    updatedAt: new Date('2024-11-26T16:45:00'),
    barcode: generateBarcode('3'),
    notes: 'Acil teslimat isteniyor.',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-0004',
    customer: mockCustomers[0],
    products: [
      {
        id: 'p6',
        name: 'Webcam 1080p',
        sku: 'CAM-006',
        price: 850,
        quantity: 1,
      },
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    totalAmount: 850,
    createdAt: new Date('2024-11-15T11:20:00'),
    updatedAt: new Date('2024-11-18T10:30:00'),
    cargoTracking: {
      cargoCompany: 'mng',
      trackingNumber: '9876543210987',
      estimatedDelivery: new Date('2024-11-18T12:00:00'),
      currentLocation: 'Teslim Edildi',
      lastUpdate: new Date('2024-11-18T10:30:00'),
    },
    barcode: generateBarcode('4'),
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-0005',
    customer: mockCustomers[1],
    products: [
      {
        id: 'p7',
        name: 'Laptop Çantası',
        sku: 'BAG-007',
        price: 350,
        quantity: 1,
      },
      {
        id: 'p8',
        name: 'Laptop Standı',
        sku: 'STD-008',
        price: 280,
        quantity: 1,
      },
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    totalAmount: 630,
    createdAt: new Date('2024-11-23T14:10:00'),
    updatedAt: new Date('2024-11-24T09:00:00'),
    cargoTracking: {
      cargoCompany: 'yurtici',
      trackingNumber: '5555666677778',
      estimatedDelivery: new Date('2024-11-27T17:00:00'),
      currentLocation: 'Ankara Şubesi',
      lastUpdate: new Date('2024-11-24T09:00:00'),
    },
    barcode: generateBarcode('5'),
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-0006',
    customer: mockCustomers[2],
    products: [
      {
        id: 'p9',
        name: 'Kulaklık Bluetooth',
        sku: 'HP-009',
        price: 650,
        quantity: 2,
      },
    ],
    status: 'pending',
    paymentStatus: 'pending',
    totalAmount: 1300,
    createdAt: new Date('2024-11-27T08:30:00'),
    updatedAt: new Date('2024-11-27T08:30:00'),
    barcode: generateBarcode('6'),
  },
];

/**
 * Mock Dashboard İstatistikleri
 */
export const mockDashboardStats: DashboardStats = {
  totalOrders: mockOrders.length,
  pendingOrders: mockOrders.filter(o => o.status === 'pending').length,
  shippedOrders: mockOrders.filter(o => o.status === 'shipped').length,
  deliveredOrders: mockOrders.filter(o => o.status === 'delivered').length,
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.totalAmount, 0),
  todayOrders: mockOrders.filter(o => {
    const today = new Date();
    const orderDate = new Date(o.createdAt);
    return orderDate.toDateString() === today.toDateString();
  }).length,
};

/**
 * Kargo Firması Bilgileri
 */
export const cargoCompanies: CargoCompanyInfo[] = [
  {
    id: 'aras',
    name: 'Aras Kargo',
    trackingUrlTemplate: 'https://www.araskargo.com.tr/sorgulama/{trackingNumber}',
  },
  {
    id: 'mng',
    name: 'MNG Kargo',
    trackingUrlTemplate: 'https://www.mngkargo.com.tr/track/{trackingNumber}',
  },
  {
    id: 'yurtici',
    name: 'Yurtiçi Kargo',
    trackingUrlTemplate: 'https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code={trackingNumber}',
  },
  {
    id: 'ptt',
    name: 'PTT Kargo',
    trackingUrlTemplate: 'https://gonderitakip.ptt.gov.tr/Track/Verify?q={trackingNumber}',
  },
  {
    id: 'ups',
    name: 'UPS',
    trackingUrlTemplate: 'https://www.ups.com/track?tracknum={trackingNumber}',
  },
  {
    id: 'dhl',
    name: 'DHL',
    trackingUrlTemplate: 'https://www.dhl.com/tr-tr/home/tracking.html?tracking-id={trackingNumber}',
  },
  {
    id: 'other',
    name: 'Diğer',
    trackingUrlTemplate: '#',
  },
];