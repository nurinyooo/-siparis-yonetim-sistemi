'use client';

import React, { useState, useMemo } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Header } from '@/components/layout/header';
import { OrderFilters } from '@/components/orders/order-filters';
import { OrderTable } from '@/components/orders/order-table';
import { Modal } from '@/components/ui/modal';
import { NewOrderForm } from '@/components/orders/new-order-form';
import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/lib/types';
import { Package, Plus } from 'lucide-react';

/**
 * Siparişler Sayfası
 * Tüm siparişleri listeler ve filtreleme imkanı sağlar
 */
export default function OrdersPage() {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Filtrelenmiş siparişler
   */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Durum filtresi
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }

      // Arama filtresi
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesOrderNumber = order.orderNumber.toLowerCase().includes(query);
        const matchesCustomerName = `${order.customer.firstName} ${order.customer.lastName}`
          .toLowerCase()
          .includes(query);
        const matchesEmail = order.customer.email.toLowerCase().includes(query);

        if (!matchesOrderNumber && !matchesCustomerName && !matchesEmail) {
          return false;
        }
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  /**
   * Filtreleri sıfırla
   */
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return (
    <div className="flex-1">
      <Header title="Siparişler" />

      <div className="p-6 space-y-6">
        {/* Başlık ve Özet */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Sipariş Listesi
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Toplam {filteredOrders.length} sipariş bulundu
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="h-5 w-5" />
              <span className="font-medium">{orders.length} Toplam Sipariş</span>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Sipariş
            </Button>
          </div>
        </div>

        {/* Filtreler */}
        <OrderFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onReset={handleResetFilters}
        />

        {/* Sipariş Tablosu */}
        <OrderTable orders={filteredOrders} />
      </div>

      {/* Yeni Sipariş Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Sipariş Oluştur"
        size="lg"
      >
        <NewOrderForm
          onSuccess={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}