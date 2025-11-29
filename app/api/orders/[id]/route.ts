import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

/**
 * GET /api/orders/[id]
 * Tek sipariş getir
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const order = await Order.findById(params.id).lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sipariş bulunamadı',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    console.error('GET /api/orders/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sipariş alınırken hata oluştu',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id]
 * Sipariş güncelle
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sipariş bulunamadı',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Sipariş başarıyla güncellendi',
    });
  } catch (error: any) {
    console.error('PUT /api/orders/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sipariş güncellenirken hata oluştu',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/orders/[id]
 * Sipariş sil
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deletedOrder = await Order.findByIdAndDelete(params.id).lean();

    if (!deletedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sipariş bulunamadı',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sipariş başarıyla silindi',
    });
  } catch (error: any) {
    console.error('DELETE /api/orders/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Sipariş silinirken hata oluştu',
      },
      { status: 500 }
    );
  }
}