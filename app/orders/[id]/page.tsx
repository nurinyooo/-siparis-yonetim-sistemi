'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { BarcodeGenerator } from '@/components/barcode/barcode-generator';
import { TrackingInput } from '@/components/cargo/tracking-input';
import { Badge } from '@/components/ui/badge';
import {
  formatCurrency,
  formatDate,
  getOrderStatusLabel,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/lib/utils';
import { OrderStatus, CargoTracking } from '@/lib/types';
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Printer,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Sipariş Detay Sayfası
 * Sipariş bilgilerini gösterir ve durum güncelleme imkanı sağlar
 */
export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById, updateOrderStatus, updateCargoTracking } = useOrders();

  const orderId = params.id as string;
  const order = getOrderById(orderId);

  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) {
    return (
      <div className="flex-1">
        <Header title="Sipariş Detayı" />
        <div className="p-6">
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sipariş Bulunamadı
            </h2>
            <p className="text-gray-600 mb-6">
              Aradığınız sipariş mevcut değil veya silinmiş olabilir.
            </p>
            <Link href="/orders">
              <Button>Siparişlere Dön</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Sipariş durumunu güncelle
   */
  const handleStatusUpdate = (newStatus: OrderStatus) => {
    setIsUpdating(true);
    updateOrderStatus(orderId, newStatus);
    setTimeout(() => {
      setIsUpdating(false);
      alert(`Sipariş durumu "${getOrderStatusLabel(newStatus)}" olarak güncellendi.`);
    }, 500);
  };

  /**
   * Kargo takip bilgilerini kaydet
   */
  const handleCargoTrackingSave = (tracking: CargoTracking) => {
    updateCargoTracking(orderId, tracking);
    // Kargolandı olarak işaretle
    if (order.status !== 'shipped' && order.status !== 'delivered') {
      updateOrderStatus(orderId, 'shipped');
    }
    alert('Kargo takip bilgileri kaydedildi!');
  };

  return (
    <div className="flex-1">
      <Header title={`Sipariş #${order.orderNumber}`} />

      <div className="p-6 space-y-6">
        {/* Geri Dön Butonu */}
        <Link href="/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Siparişlere Dön
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Kolon - Ana Bilgiler */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sipariş Özet */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Sipariş Bilgileri
                  </CardTitle>
                  <Link href={`/orders/${order.id}/print`} target="_blank">
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Yazdır
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Sipariş No</p>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sipariş Tarihi</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durum</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ödeme Durumu</p>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Müşteri Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Ad Soyad</p>
                  <p className="font-medium text-gray-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-posta</p>
                  <p className="font-medium text-gray-900">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="font-medium text-gray-900">{order.customer.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Teslimat Adresi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Teslimat Adresi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">
                  {order.customer.address.street}
                </p>
                <p className="text-gray-900 mt-1">
                  {order.customer.address.district} / {order.customer.address.city}
                </p>
                <p className="text-gray-600 mt-1">
                  {order.customer.address.postalCode}, {order.customer.address.country}
                </p>
              </CardContent>
            </Card>

            {/* Ürünler */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Sipariş Detayları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">
                          {product.quantity} x {formatCurrency(product.price)}
                        </p>
                        <p className="font-medium text-gray-900">
                          {formatCurrency(product.price * product.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-3 border-t-2">
                    <p className="text-lg font-semibold text-gray-900">Toplam</p>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ Kolon - Aksiyonlar */}
          <div className="space-y-6">
            {/* Durum Güncelleme */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  Durum Güncelle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={order.status === 'pending' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleStatusUpdate('pending')}
                  disabled={isUpdating}
                >
                  Beklemede
                </Button>
                <Button
                  variant={order.status === 'preparing' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleStatusUpdate('preparing')}
                  disabled={isUpdating}
                >
                  Hazırlanıyor
                </Button>
                <Button
                  variant={order.status === 'shipped' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleStatusUpdate('shipped')}
                  disabled={isUpdating}
                >
                  Kargolandı
                </Button>
                <Button
                  variant={order.status === 'delivered' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleStatusUpdate('delivered')}
                  disabled={isUpdating}
                >
                  Teslim Edildi
                </Button>
                <Button
                  variant={order.status === 'cancelled' ? 'destructive' : 'outline'}
                  className="w-full"
                  onClick={() => handleStatusUpdate('cancelled')}
                  disabled={isUpdating}
                >
                  İptal Et
                </Button>
              </CardContent>
            </Card>

            {/* Kargo Takip */}
            <TrackingInput
              currentTracking={order.cargoTracking}
              onSave={handleCargoTrackingSave}
            />

            {/* Barkod */}
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Barkodu</CardTitle>
              </CardHeader>
              <CardContent>
                {order.barcode && (
                  <BarcodeGenerator value={order.barcode} type="barcode" width={1.5} height={60} />
                )}
              </CardContent>
            </Card>

            {/* Notlar */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}