import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

/**
 * GET /api/orders
 * Tüm siparişleri getir
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const phone = searchParams.get('phone');

    // Build filter
    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (phone) {
      filter['customer.phone'] = { $regex: phone, $options: 'i' };
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 }) // En yeni önce
      .lean(); // Plain JavaScript object olarak döndür

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error: any) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Siparişler alınırken hata oluştu',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Yeni sipariş oluştur
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validasyon
    if (!body.customer || !body.products || !body.orderNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Eksik bilgiler. customer, products ve orderNumber gerekli.',
        },
        { status: 400 }
      );
    }

    // Sipariş numarası kontrolü (unique olmalı)
    const existingOrder = await Order.findOne({ orderNumber: body.orderNumber });
    if (existingOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu sipariş numarası zaten kullanılıyor.',
        },
        { status: 400 }
      );
    }

    // Yeni sipariş oluştur
    const newOrder = await Order.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: 'Sipariş başarıyla oluşturuldu',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sipariş oluşturulurken hata oluştu',
      },
      { status: 500 }
    );
  }
}