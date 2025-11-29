import { type ClassValue, clsx } from 'clsx';
import { CargoCompany, OrderStatus, PaymentStatus } from './types';

/**
 * Tailwind CSS sınıflarını birleştiren yardımcı fonksiyon
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Sipariş durumunu Türkçe'ye çeviren fonksiyon
 */
export function getOrderStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Beklemede',
    preparing: 'Hazırlanıyor',
    shipped: 'Kargolandı',
    delivered: 'Teslim Edildi',
    cancelled: 'İptal Edildi',
  };
  return labels[status];
}

/**
 * Ödeme durumunu Türkçe'ye çeviren fonksiyon
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    paid: 'Ödendi',
    pending: 'Beklemede',
    refunded: 'İade Edildi',
  };
  return labels[status];
}

/**
 * Kargo firması adını döndüren fonksiyon
 */
export function getCargoCompanyName(company: CargoCompany): string {
  const names: Record<CargoCompany, string> = {
    aras: 'Aras Kargo',
    mng: 'MNG Kargo',
    yurtici: 'Yurtiçi Kargo',
    ptt: 'PTT Kargo',
    ups: 'UPS',
    dhl: 'DHL',
    other: 'Diğer',
  };
  return names[company];
}

/**
 * Kargo takip URL'sini oluşturan fonksiyon
 */
export function getCargoTrackingUrl(company: CargoCompany, trackingNumber: string): string {
  const templates: Record<CargoCompany, string> = {
    aras: `https://www.araskargo.com.tr/sorgulama/${trackingNumber}`,
    mng: `https://www.mngkargo.com.tr/track/${trackingNumber}`,
    yurtici: `https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${trackingNumber}`,
    ptt: `https://gonderitakip.ptt.gov.tr/Track/Verify?q=${trackingNumber}`,
    ups: `https://www.ups.com/track?tracknum=${trackingNumber}`,
    dhl: `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${trackingNumber}`,
    other: '#',
  };
  return templates[company] || '#';
}

/**
 * Sipariş durumuna göre renk sınıfı döndüren fonksiyon
 */
export function getOrderStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    preparing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[status];
}

/**
 * Ödeme durumuna göre renk sınıfı döndüren fonksiyon
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    paid: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    refunded: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status];
}

/**
 * Fiyatı Türk Lirası formatında döndüren fonksiyon
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
}

/**
 * Tarihi Türkçe formatında döndüren fonksiyon
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Sadece tarih formatı (saat olmadan)
 */
export function formatDateOnly(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
}

/**
 * Benzersiz sipariş numarası oluşturan fonksiyon
 */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${year}-${random}`;
}

/**
 * Benzersiz barkod oluşturan fonksiyon
 */
export function generateBarcode(orderId: string): string {
  // Basit bir barkod formatı: 8690XXXXXXXX (13 haneli)
  const prefix = '8690';
  const timestamp = Date.now().toString().slice(-8);
  const checksum = ((parseInt(timestamp) % 10) + parseInt(orderId.slice(-1)) % 10) % 10;
  return `${prefix}${timestamp}${checksum}`;
}