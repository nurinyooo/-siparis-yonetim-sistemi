'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Menü öğeleri
 */
const menuItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Siparişler',
    href: '/orders',
    icon: Package,
  },
  {
    title: 'Ayarlar',
    href: '/settings',
    icon: Settings,
  },
];

/**
 * Sidebar (Yan Menü) Bileşeni
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
        {/* Logo / Başlık */}
        <div className="flex items-center flex-shrink-0 px-6 mb-6">
          <Package className="h-8 w-8 text-blue-600" />
          <span className="ml-3 text-xl font-bold text-gray-900">
            Sipariş Sistemi
          </span>
        </div>

        {/* Menü Öğeleri */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Alt Bilgi */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">AD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}