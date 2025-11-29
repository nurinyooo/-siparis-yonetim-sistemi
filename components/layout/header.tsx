'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Header (Üst Başlık) Bileşeni
 */
interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Başlık */}
          <div className="flex-1">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            )}
          </div>

          {/* Sağ Taraf - Arama ve Bildirimler */}
          <div className="flex items-center gap-4">
            {/* Arama Kutusu */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Sipariş ara..."
                className="pl-9 w-64"
              />
            </div>

            {/* Bildirimler */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}