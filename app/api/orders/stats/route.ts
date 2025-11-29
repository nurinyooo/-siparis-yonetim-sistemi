import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

/**
 * GET /api/orders/stats
 * Dashboard istatistiklerini getir
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Paralel olarak tüm istatistikleri hesapla
    const [
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      todayOrders,
      revenueResult,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'shipped' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
          },
        },
      ]),
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const stats = {
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue,
      todayOrders,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('GET /api/orders/stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'İstatistikler alınırken hata oluştu',
      },
      { status: 500 }
    );
  }
}