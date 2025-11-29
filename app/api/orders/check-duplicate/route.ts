import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

/**
 * POST /api/orders/check-duplicate
 * Tekrar sipariş kontrolü yap
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Telefon numarası gerekli',
        },
        { status: 400 }
      );
    }

    // Son 30 gün
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);

    // Telefon numarasını temizle (sadece rakamlar)
    const cleanPhone = phone.replace(/\D/g, '');

    // Son 1 ay içinde aynı telefon numarasıyla yapılmış siparişleri bul
    const duplicateOrders = await Order.find({
      'customer.phone': { $regex: cleanPhone },
      createdAt: { $gte: lastMonth },
    })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();

    if (duplicateOrders.length > 0) {
      return NextResponse.json({
        success: true,
        hasDuplicate: true,
        data: duplicateOrders[0],
      });
    }

    return NextResponse.json({
      success: true,
      hasDuplicate: false,
      data: null,
    });
  } catch (error: any) {
    console.error('POST /api/orders/check-duplicate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Kontrol yapılırken hata oluştu',
      },
      { status: 500 }
    );
  }
}