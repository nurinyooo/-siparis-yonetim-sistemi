'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CargoCompany, CargoTracking } from '@/lib/types';
import { getCargoCompanyName, getCargoTrackingUrl } from '@/lib/utils';
import { cargoCompanies } from '@/lib/mock-data';
import { Truck, ExternalLink, Save } from 'lucide-react';

/**
 * Kargo Takip Bilgisi Girişi Bileşeni
 * Kargo firması ve takip numarası girişi yapar
 */
interface TrackingInputProps {
  currentTracking?: CargoTracking;
  onSave: (tracking: CargoTracking) => void;
}

export function TrackingInput({ currentTracking, onSave }: TrackingInputProps) {
  const [cargoCompany, setCargoCompany] = useState<CargoCompany>(
    currentTracking?.cargoCompany || 'aras'
  );
  const [trackingNumber, setTrackingNumber] = useState(
    currentTracking?.trackingNumber || ''
  );

  const handleSave = () => {
    if (!trackingNumber.trim()) {
      alert('Lütfen takip numarası giriniz!');
      return;
    }

    const tracking: CargoTracking = {
      cargoCompany,
      trackingNumber: trackingNumber.trim(),
      trackingUrl: getCargoTrackingUrl(cargoCompany, trackingNumber.trim()),
      lastUpdate: new Date(),
    };

    onSave(tracking);
  };

  const trackingUrl = trackingNumber
    ? getCargoTrackingUrl(cargoCompany, trackingNumber)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-blue-600" />
          Kargo Takip Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Kargo Firması Seçimi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kargo Firması
          </label>
          <Select
            value={cargoCompany}
            onChange={(e) => setCargoCompany(e.target.value as CargoCompany)}
          >
            {cargoCompanies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Takip Numarası */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Takip Numarası
          </label>
          <Input
            type="text"
            placeholder="Takip numarasını giriniz..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>

        {/* Takip URL'si */}
        {trackingUrl && trackingUrl !== '#' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-gray-600 mb-2">Takip Linki:</p>
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 underline"
            >
              {getCargoCompanyName(cargoCompany)} Takip Sayfası
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* Kaydet Butonu */}
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Kargo Bilgilerini Kaydet
        </Button>

        {/* Mevcut Takip Bilgisi */}
        {currentTracking && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
            <p className="text-xs text-gray-500 mb-1">Mevcut Bilgi:</p>
            <p className="text-sm font-medium text-gray-900">
              {getCargoCompanyName(currentTracking.cargoCompany)} -{' '}
              {currentTracking.trackingNumber}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}