'use client';

import React from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OrderStatusBadge } from './order-status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, getPaymentStatusColor, getPaymentStatusLabel } from '@/lib/utils';
import { Eye, Printer } from 'lucide-react';

/**
 * Sipariş Tablosu Bileşeni
 * Siparişleri tablo formatında listeler
 */
interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 text-lg">Sipariş bulunamadı.</p>
        <p className="text-gray-400 text-sm mt-2">Farklı filtreler deneyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sipariş No</TableHead>
            <TableHead>Müşteri</TableHead>
            <TableHead>Ürün Sayısı</TableHead>
            <TableHead>Tutar</TableHead>
            <TableHead>Ödeme</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.orderNumber}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">
                  {order.products.reduce((sum, p) => sum + p.quantity, 0)} adet
                </span>
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {formatCurrency(order.totalAmount)}
              </TableCell>
              <TableCell>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {getPaymentStatusLabel(order.paymentStatus)}
                </Badge>
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Detay
                    </Button>
                  </Link>
                  <Link href={`/orders/${order.id}/print`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}