import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { OrderProvider } from '@/context/OrderContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sipariş Yönetim Sistemi',
  description: 'Sipariş yönetimi ve kargo takip sistemi',
};

/**
 * Root Layout
 * Tüm sayfaları sarmalayan ana layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <OrderProvider>
          <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Ana İçerik Alanı */}
            <div className="flex flex-col flex-1 md:pl-64">
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </OrderProvider>
      </body>
    </html>
  );
}