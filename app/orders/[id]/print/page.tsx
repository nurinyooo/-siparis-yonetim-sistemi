'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { BarcodeGenerator } from '@/components/barcode/barcode-generator';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Printer, X } from 'lucide-react';

/**
 * Yazdırılabilir Barkod Etiket Sayfası
 * Sipariş için barkod ve kargo etiketini yazdırılabilir formatta gösterir
 */
export default function PrintLabelPage() {
  const params = useParams();
  const { getOrderById } = useOrders();

  const orderId = params.id as string;
  const order = getOrderById(orderId);

  useEffect(() => {
    // Sayfa yüklendiğinde otomatik yazdırma diyaloğu açılabilir (opsiyonel)
    // window.print();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sipariş Bulunamadı
          </h2>
          <p className="text-gray-600">
            Yazdırılacak sipariş bulunamadı.
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Yazdırma Kontrolleri - Ekranda görünür, yazdırmada gizli */}
      <div className="no-print bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          Sipariş Etiketi - {order.orderNumber}
        </h1>
        <div className="flex items-center gap-3">
          <Button onClick={handlePrint} size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Yazdır
          </Button>
          <Button onClick={handleClose} variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Kapat
          </Button>
        </div>
      </div>

      {/* Yazdırılabilir Alan */}
      <div className="print-area p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg">
          {/* A4 Boyutunda Etiket - 210mm x 297mm */}
          <div className="p-12 space-y-8" style={{ minHeight: '297mm' }}>
            {/* Üst Başlık */}
            <div className="text-center border-b-4 border-gray-900 pb-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                KARGO ETİKETİ
              </h1>
              <p className="text-xl text-gray-600">
                Sipariş No: {order.orderNumber}
              </p>
            </div>

            {/* Barkod Alanı */}
            <div className="flex justify-center py-8 bg-gray-50 rounded-lg">
              {order.barcode && (
                <BarcodeGenerator
                  value={order.barcode}
                  type="barcode"
                  width={2.5}
                  height={100}
                  displayValue={true}
                />
              )}
            </div>

            {/* QR Kod (Opsiyonel) */}
            <div className="flex justify-center py-4">
              {order.barcode && (
                <div className="text-center">
                  <BarcodeGenerator
                    value={order.barcode}
                    type="qrcode"
                    height={120}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Mobil ile tarayın
                  </p>
                </div>
              )}
            </div>

            {/* Gönderen Bilgisi */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gray-900 text-white px-3 py-1 rounded mr-3">
                  GÖNDEREN
                </span>
              </h2>
              <div className="text-lg text-gray-800">
                <p className="font-semibold">Şirket Adı</p>
                <p>İstanbul, Türkiye</p>
                <p>Tel: 0212 123 4567</p>
              </div>
            </div>

            {/* Alıcı Bilgisi */}
            <div className="border-4 border-gray-900 rounded-lg p-6 bg-yellow-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gray-900 text-white px-4 py-2 rounded mr-3">
                  ALICI
                </span>
              </h2>
              <div className="text-xl text-gray-900 space-y-2">
                <p className="text-2xl font-bold">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="font-medium">{order.customer.phone}</p>
                <div className="mt-4 pt-4 border-t-2 border-gray-300">
                  <p className="text-lg leading-relaxed">
                    {order.customer.address.street}
                  </p>
                  <p className="font-semibold mt-2">
                    {order.customer.address.district} / {order.customer.address.city}
                  </p>
                  <p className="text-lg">
                    Posta Kodu: {order.customer.address.postalCode}
                  </p>
                  <p className="font-bold mt-2">{order.customer.address.country}</p>
                </div>
              </div>
            </div>

            {/* Kargo Bilgisi */}
            {order.cargoTracking && (
              <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                <h2 className="text-xl font-bold text-blue-900 mb-3">
                  KARGO TAKİP BİLGİSİ
                </h2>
                <div className="text-lg text-blue-900">
                  <p>
                    <span className="font-semibold">Kargo Firması:</span>{' '}
                    {order.cargoTracking.cargoCompany.toUpperCase()}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Takip No:</span>{' '}
                    <span className="text-2xl font-mono font-bold">
                      {order.cargoTracking.trackingNumber}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Sipariş Özeti */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                SİPARİŞ ÖZETİ
              </h2>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <span className="font-semibold">Sipariş Tarihi:</span>{' '}
                  {formatDate(order.createdAt)}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Ürün Sayısı:</span>{' '}
                  {order.products.reduce((sum, p) => sum + p.quantity, 0)} adet
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Ürünler:</span>
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} ({product.quantity} adet)
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Notlar */}
            {order.notes && (
              <div className="border-2 border-yellow-400 rounded-lg p-6 bg-yellow-50">
                <h2 className="text-xl font-bold text-yellow-900 mb-3">
                  ÖNEMLİ NOTLAR
                </h2>
                <p className="text-lg text-yellow-900">{order.notes}</p>
              </div>
            )}

            {/* Alt Bilgi */}
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-300">
              <p>Bu etiket otomatik olarak oluşturulmuştur.</p>
              <p className="mt-1">Yazdırma Tarihi: {formatDate(new Date())}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}