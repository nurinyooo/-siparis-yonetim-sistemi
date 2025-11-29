'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { OrderStatus } from '@/lib/types';
import { getOrderStatusLabel } from '@/lib/utils';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Sipariş Filtreleme Bileşeni
 * Siparişleri durum, tarih ve arama kriterlerine göre filtreler
 */
interface OrderFiltersProps {
  searchQuery: string;
  statusFilter: OrderStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatus | 'all') => void;
  onReset: () => void;
}

export function OrderFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
}: OrderFiltersProps) {
  const statuses: (OrderStatus | 'all')[] = [
    'all',
    'pending',
    'preparing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4 text-gray-600" />
        <h3 className="font-medium text-gray-900">Filtrele</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Arama */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Sipariş no veya müşteri adı..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Durum Filtresi */}
        <Select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as OrderStatus | 'all')}
        >
          <option value="all">Tüm Durumlar</option>
          {statuses.slice(1).map((status) => (
            <option key={status} value={status}>
              {getOrderStatusLabel(status as OrderStatus)}
            </option>
          ))}
        </Select>

        {/* Sıfırla Butonu */}
        <Button variant="outline" onClick={onReset} className="w-full md:w-auto">
          Filtreleri Sıfırla
        </Button>
      </div>
    </div>
  );
}