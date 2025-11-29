'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Building2, Truck, Bell, Palette } from 'lucide-react';

/**
 * Ayarlar Sayfası
 * Uygulama ayarlarını yönetir
 */
export default function SettingsPage() {
  return (
    <div className="flex-1">
      <Header title="Ayarlar" />

      <div className="p-6 space-y-6">
        {/* Başlık */}
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h2>
            <p className="text-sm text-gray-500 mt-1">
              Uygulama ayarlarını buradan yönetebilirsiniz
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Şirket Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Şirket Bilgileri
              </CardTitle>
              <CardDescription>
                Kargo etiketlerinde görünecek şirket bilgileriniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Şirket Adı</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şirket Adı Giriniz"
                  defaultValue="Şirket Adı"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Adres</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Şirket adresi"
                  defaultValue="İstanbul, Türkiye"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Telefon</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0212 123 4567"
                  defaultValue="0212 123 4567"
                />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Kaydet
              </button>
            </CardContent>
          </Card>

          {/* Kargo Ayarları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Kargo Ayarları
              </CardTitle>
              <CardDescription>
                Varsayılan kargo firması ve ayarları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Varsayılan Kargo Firması</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="aras">Aras Kargo</option>
                  <option value="mng">MNG Kargo</option>
                  <option value="yurtici">Yurtiçi Kargo</option>
                  <option value="ptt">PTT Kargo</option>
                  <option value="ups">UPS</option>
                  <option value="dhl">DHL</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Otomatik Kargo Bildirimi</label>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Barkod Otomatik Oluştur</label>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Kaydet
              </button>
            </CardContent>
          </Card>

          {/* Bildirim Ayarları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Bildirim Ayarları
              </CardTitle>
              <CardDescription>
                E-posta ve sistem bildirimleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Yeni Sipariş Bildirimi</label>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Durum Değişikliği Bildirimi</label>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Günlük Rapor E-postası</label>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bildirim E-posta Adresi</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ornek@email.com"
                  defaultValue="admin@example.com"
                />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Kaydet
              </button>
            </CardContent>
          </Card>

          {/* Görünüm Ayarları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Görünüm Ayarları
              </CardTitle>
              <CardDescription>
                Arayüz ve tema tercihleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tema</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="light">Açık</option>
                  <option value="dark">Koyu</option>
                  <option value="auto">Sistem</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sayfa Başına Sipariş Sayısı</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Kompakt Görünüm</label>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Kaydet
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Bilgi Notu */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              <strong>Not:</strong> Bu sayfa henüz geliştirme aşamasındadır. Ayarlar şu anda
              sadece görsel amaçlıdır ve kaydedilmemektedir. Veritabanı entegrasyonu ile birlikte
              bu ayarlar aktif hale gelecektir.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}