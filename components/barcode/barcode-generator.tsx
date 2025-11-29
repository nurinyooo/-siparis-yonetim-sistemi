'use client';

import React from 'react';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';

/**
 * Barkod Tipileri
 */
type BarcodeType = 'barcode' | 'qrcode';

/**
 * Barkod/QR Kod Üretici Bileşeni
 * Siparişler için barkod veya QR kod üretir
 */
interface BarcodeGeneratorProps {
  value: string;
  type?: BarcodeType;
  width?: number;
  height?: number;
  displayValue?: boolean;
  className?: string;
}

export function BarcodeGenerator({
  value,
  type = 'barcode',
  width = 2,
  height = 80,
  displayValue = true,
  className = '',
}: BarcodeGeneratorProps) {
  if (type === 'qrcode') {
    return (
      <div className={`flex justify-center ${className}`}>
        <QRCodeSVG
          value={value}
          size={height}
          level="H"
          includeMargin={true}
        />
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Barcode
        value={value}
        width={width}
        height={height}
        displayValue={displayValue}
        format="CODE128"
        background="#ffffff"
        lineColor="#000000"
      />
    </div>
  );
}