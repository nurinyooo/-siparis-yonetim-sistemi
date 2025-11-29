import React from 'react';
import { OrderStatus } from '@/lib/types';
import { getOrderStatusLabel, getOrderStatusColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/**
 * Sipariş Durum Badge Bileşeni
 * Sipariş durumunu renkli badge olarak gösterir
 */
interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <Badge className={`${getOrderStatusColor(status)} ${className}`}>
      {getOrderStatusLabel(status)}
    </Badge>
  );
}