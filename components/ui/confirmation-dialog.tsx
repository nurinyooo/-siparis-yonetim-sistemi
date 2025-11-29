'use client';

import React from 'react';
import { Button } from './button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'danger' | 'info';
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Devam Et',
  cancelText = 'İptal',
  variant = 'warning',
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    warning: {
      icon: 'text-yellow-600 bg-yellow-100',
      border: 'border-yellow-200',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    danger: {
      icon: 'text-red-600 bg-red-100',
      border: 'border-red-200',
      button: 'bg-red-600 hover:bg-red-700',
    },
    info: {
      icon: 'text-blue-600 bg-blue-100',
      border: 'border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const styles = variantStyles[variant];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className={`flex items-start gap-4 p-6 border-b ${styles.border}`}>
            <div className={`flex-shrink-0 p-3 rounded-full ${styles.icon}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-600 whitespace-pre-line">{message}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className={`flex-1 text-white ${styles.button}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}