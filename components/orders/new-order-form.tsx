'use client';

import React, { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Order, Product, Customer } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { generateOrderNumber, generateBarcode } from '@/lib/utils';
import { Plus, Trash2, User, Package, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

/**
 * Yeni Sipariş Formu
 * Yeni sipariş ekleme formu
 */
interface NewOrderFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function NewOrderForm({ onSuccess, onCancel }: NewOrderFormProps) {
  const { addOrder, checkDuplicateOrder } = useOrders();

  // Form state
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    postalCode: '',
  });

  const [products, setProducts] = useState<Array<{
    name: string;
    sku: string;
    price: number;
    quantity: number;
  }>>([
    { name: '', sku: '', price: 0, quantity: 1 },
  ]);

  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>('pending');

  // Dialog state
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [duplicateOrder, setDuplicateOrder] = useState<Order | null>(null);
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);

  /**
   * Ürün ekleme
   */
  const addProduct = () => {
    setProducts([...products, { name: '', sku: '', price: 0, quantity: 1 }]);
  };

  /**
   * Ürün silme
   */
  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  /**
   * Ürün güncelleme
   */
  const updateProduct = (index: number, field: string, value: any) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  /**
   * Toplam tutarı hesapla
   */
  const calculateTotal = () => {
    return products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  };

  /**
   * Siparişi oluştur (validasyon sonrası)
   */
  const createOrder = () => {
    // Müşteri nesnesi oluştur
    const customer: Customer = {
      id: `customer-${Date.now()}`,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email || `${customerInfo.phone}@temp.com`,
      phone: customerInfo.phone,
      address: {
        street: customerInfo.street || 'Adres bilgisi yok',
        city: customerInfo.city || 'İstanbul',
        district: customerInfo.district || '-',
        postalCode: customerInfo.postalCode || '00000',
        country: 'Türkiye',
      },
    };

    // Ürünler dizisi oluştur
    const orderProducts: Product[] = products.map((p, i) => ({
      id: `product-${Date.now()}-${i}`,
      name: p.name,
      sku: p.sku || `SKU-${Date.now()}-${i}`,
      price: p.price,
      quantity: p.quantity,
    }));

    // Sipariş nesnesi oluştur
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customer,
      products: orderProducts,
      status: 'pending',
      paymentStatus,
      totalAmount: calculateTotal(),
      createdAt: new Date(),
      updatedAt: new Date(),
      barcode: generateBarcode(`order-${Date.now()}`),
    };

    // Siparişi ekle
    addOrder(newOrder);
    alert(`Sipariş başarıyla oluşturuldu! Sipariş No: ${newOrder.orderNumber}`);
    onSuccess();
  };

  /**
   * Form gönderme
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasyon
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone) {
      alert('Lütfen müşteri bilgilerini eksiksiz doldurun!');
      return;
    }

    if (products.some(p => !p.name || p.price <= 0)) {
      alert('Lütfen ürün bilgilerini eksiksiz doldurun!');
      return;
    }

    // Benzer sipariş kontrolü
    const productNames = products.map(p => p.name);
    console.log('Kontrol ediliyor - Telefon:', customerInfo.phone, 'Ürünler:', productNames);
    const duplicate = checkDuplicateOrder(customerInfo.phone, productNames);
    console.log('Benzer sipariş bulundu mu?', duplicate);

    if (duplicate) {
      // Benzer sipariş bulundu, kullanıcıya sor
      console.log('Uyarı gösteriliyor:', duplicate);
      setDuplicateOrder(duplicate);
      setShowDuplicateDialog(true);
    } else {
      // Benzer sipariş yok, direkt oluştur
      console.log('Benzer sipariş yok, yeni sipariş oluşturuluyor');
      createOrder();
    }
  };

  /**
   * Duplicate dialog onaylandığında
   */
  const handleConfirmDuplicate = () => {
    setShowDuplicateDialog(false);
    createOrder();
  };

  /**
   * Duplicate dialog iptal edildiğinde
   */
  const handleCancelDuplicate = () => {
    setShowDuplicateDialog(false);
    setDuplicateOrder(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Müşteri Bilgileri */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Müşteri Bilgileri</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
              placeholder="Ahmet"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soyad <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={customerInfo.lastName}
              onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
              placeholder="Yılmaz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon <span className="text-red-500">*</span>
            </label>
            <Input
              required
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              placeholder="0532 123 4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <Input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              placeholder="ornek@email.com"
            />
          </div>
        </div>
      </div>

      {/* Adres Bilgileri */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Teslimat Adresi</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
            <Input
              value={customerInfo.street}
              onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
              placeholder="Sokak, Mahalle, No, Daire"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
              <Input
                value={customerInfo.district}
                onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                placeholder="Kadıköy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İl</label>
              <Input
                value={customerInfo.city}
                onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                placeholder="İstanbul"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
              <Input
                value={customerInfo.postalCode}
                onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                placeholder="34710"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ürünler</h3>
          </div>
          <Button type="button" onClick={addProduct} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Ürün Ekle
          </Button>
        </div>

        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-lg">
              <div className="col-span-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Ürün Adı <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  value={product.name}
                  onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  placeholder="Ürün adı"
                  size="sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
                <Input
                  value={product.sku}
                  onChange={(e) => updateProduct(index, 'sku', e.target.value)}
                  placeholder="SKU"
                  size="sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Fiyat <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  size="sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Adet <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                  size="sm"
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <div className="text-sm font-medium text-gray-900">
                  {(product.price * product.quantity).toFixed(2)} ₺
                </div>
                {products.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Toplam */}
        <div className="mt-4 flex justify-end">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Toplam:</span>
              <span className="text-xl font-bold text-blue-600">
                {calculateTotal().toFixed(2)} ₺
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ödeme Durumu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Durumu</label>
        <Select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value as 'paid' | 'pending')}
        >
          <option value="pending">Ödeme Bekleniyor</option>
          <option value="paid">Ödeme Alındı</option>
        </Select>
      </div>

      {/* Butonlar */}
      <div className="flex items-center gap-3 pt-4 border-t">
        <Button type="submit" className="flex-1">
          Siparişi Oluştur
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          İptal
        </Button>
      </div>

      {/* Tekrar Sipariş Uyarı Dialog */}
      <ConfirmationDialog
        isOpen={showDuplicateDialog}
        onClose={handleCancelDuplicate}
        onConfirm={handleConfirmDuplicate}
        title="Tekrar Sipariş Uyarısı!"
        message={duplicateOrder ?
          `Bu müşteri (${duplicateOrder.customer.phone}) için son 1 ay içinde zaten bir sipariş oluşturulmuş:\n\nSipariş No: ${duplicateOrder.orderNumber}\nMüşteri: ${duplicateOrder.customer.firstName} ${duplicateOrder.customer.lastName}\nTarih: ${format(new Date(duplicateOrder.createdAt), 'dd.MM.yyyy HH:mm', { locale: tr })}\nDurum: ${duplicateOrder.status}\nToplam: ${duplicateOrder.totalAmount.toFixed(2)} ₺\n\nBu müşteri için yine de yeni sipariş oluşturmak istiyor musunuz?`
          : 'Bu müşteri için son 1 ay içinde sipariş oluşturulmuş. Devam etmek istiyor musunuz?'
        }
        confirmText="Yine de Oluştur"
        cancelText="İptal Et"
        variant="warning"
      />
    </form>
  );
}