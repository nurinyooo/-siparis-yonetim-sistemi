'use client';

import React from 'react';
import { useOrders } from '@/context/OrderContext';
import { Header } from '@/components/layout/header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  TrendingUp,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Dashboard (Ana Sayfa)
 * İstatistikler ve son siparişleri gösterir
 */
export default function DashboardPage() {
  const { orders, stats } = useOrders();

  // Son 5 siparişi al
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1">
      <Header title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* İstatistik Kartları */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Toplam Sipariş"
            value={stats.totalOrders}
            description="Tüm zamanların toplamı"
            icon={Package}
            iconColor="text-blue-600"
          />

          <StatsCard
            title="Bekleyen Siparişler"
            value={stats.pendingOrders}
            description="İşlem bekleyen"
            icon={Clock}
            iconColor="text-yellow-600"
          />

          <StatsCard
            title="Kargodaki Siparişler"
            value={stats.shippedOrders}
            description="Yolda olan siparişler"
            icon={Truck}
            iconColor="text-purple-600"
          />

          <StatsCard
            title="Teslim Edildi"
            value={stats.deliveredOrders}
            description="Başarıyla teslim edildi"
            icon={CheckCircle}
            iconColor="text-green-600"
          />
        </div>

        {/* Gelir Özeti */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Toplam Gelir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Tüm siparişlerden elde edilen gelir
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Bugünkü Siparişler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.todayOrders}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Bugün alınan sipariş sayısı
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Son Siparişler Tablosu */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Siparişler</CardTitle>
              <Link href="/orders">
                <Button variant="outline" size="sm">
                  Tümünü Gör
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      {order.customer.firstName} {order.customer.lastName}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          Detay
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {recentOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Henüz sipariş bulunmuyor.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}