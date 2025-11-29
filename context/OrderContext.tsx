'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, OrderStatus, CargoTracking, DashboardStats } from '@/lib/types';
import { mockOrders, mockDashboardStats } from '@/lib/mock-data';

/**
 * Context için tip tanımı
 */
interface OrderContextType {
  orders: Order[];
  stats: DashboardStats;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateCargoTracking: (orderId: string, tracking: CargoTracking) => void;
  addOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  refreshStats: () => void;
  checkDuplicateOrder: (customerPhone: string, productNames: string[]) => Order | null;
}

/**
 * Context oluştur
 */
const OrderContext = createContext<OrderContextType | undefined>(undefined);

/**
 * Provider Props
 */
interface OrderProviderProps {
  children: ReactNode;
}

/**
 * Order Context Provider
 * Sipariş verilerini ve işlemlerini yönetir
 */
export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);

  /**
   * ID'ye göre sipariş getir
   */
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  /**
   * Sipariş durumunu güncelle
   */
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
    refreshStats();
  };

  /**
   * Kargo takip bilgilerini güncelle
   */
  const updateCargoTracking = (orderId: string, tracking: CargoTracking) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, cargoTracking: tracking, updatedAt: new Date() }
          : order
      )
    );
  };

  /**
   * Yeni sipariş ekle
   */
  const addOrder = (order: Order) => {
    setOrders(prevOrders => [...prevOrders, order]);
    refreshStats();
  };

  /**
   * Sipariş sil
   */
  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    refreshStats();
  };

  /**
   * Benzer sipariş kontrolü
   * Aynı müşteri telefonu ile son 1 ay içinde oluşturulmuş sipariş var mı kontrol eder
   */
  const checkDuplicateOrder = (customerPhone: string, productNames: string[]): Order | null => {
    const now = new Date();
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    console.log('=== Sipariş Kontrol Başlıyor ===');
    console.log('Şu anki tarih:', now);
    console.log('Son 1 ay:', lastMonth);
    console.log('Toplam sipariş sayısı:', orders.length);

    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = customerPhone.replace(/\D/g, '');
    console.log('Temizlenmiş telefon:', cleanPhone);

    // Son 1 ay içinde aynı telefon numarasıyla yapılan siparişleri bul
    const duplicates = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const orderPhone = order.customer.phone.replace(/\D/g, '');

      console.log('\n--- Sipariş Kontrol Ediliyor ---');
      console.log('Sipariş No:', order.orderNumber);
      console.log('Sipariş Tarihi:', orderDate);
      console.log('Sipariş Telefon:', orderPhone);

      // Zaman kontrolü
      if (orderDate < lastMonth) {
        console.log('❌ Zaman kontrolü geçmedi (çok eski)');
        return false;
      }
      console.log('✅ Zaman kontrolü geçti');

      // Telefon kontrolü
      if (orderPhone !== cleanPhone) {
        console.log('❌ Telefon kontrolü geçmedi', orderPhone, '!==', cleanPhone);
        return false;
      }
      console.log('✅ Telefon kontrolü geçti - Tekrar sipariş tespit edildi!');

      return true;
    });

    console.log('\n=== Sonuç ===');
    console.log('Bulunan tekrar sipariş sayısı:', duplicates.length);
    if (duplicates.length > 0) {
      console.log('İlk tekrar sipariş:', duplicates[0]);
    }

    return duplicates.length > 0 ? duplicates[0] : null;
  };

  /**
   * İstatistikleri yeniden hesapla
   */
  const refreshStats = () => {
    const currentOrders = orders;
    const newStats: DashboardStats = {
      totalOrders: currentOrders.length,
      pendingOrders: currentOrders.filter(o => o.status === 'pending').length,
      shippedOrders: currentOrders.filter(o => o.status === 'shipped').length,
      deliveredOrders: currentOrders.filter(o => o.status === 'delivered').length,
      totalRevenue: currentOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      todayOrders: currentOrders.filter(o => {
        const today = new Date();
        const orderDate = new Date(o.createdAt);
        return orderDate.toDateString() === today.toDateString();
      }).length,
    };
    setStats(newStats);
  };

  const value: OrderContextType = {
    orders,
    stats,
    getOrderById,
    updateOrderStatus,
    updateCargoTracking,
    addOrder,
    deleteOrder,
    refreshStats,
    checkDuplicateOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

/**
 * Custom hook - Order Context kullanımı
 */
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}