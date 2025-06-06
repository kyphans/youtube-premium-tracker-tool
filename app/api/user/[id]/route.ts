import { NextResponse } from 'next/server';
import { sql } from '../../../../lib/db';
import camelcaseKeys from 'camelcase-keys';

// Lấy user theo id
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const camelCaseUser = camelcaseKeys(result[0], { deep: true });
    return NextResponse.json(camelCaseUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user', detail: String(error) }, { status: 500 });
  }
}

// Cập nhật user theo id
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const {
      description,
      duration,
      available,
      feeConstant,
      startDate,
      endDate,
      status,
      userEmail,
      ownerFamilyEmail,
      paymentNotes
    } = await request.json();
    const result = await sql`
      UPDATE users SET
        description = ${description},
        duration = ${duration},
        available = ${available},
        fee_constant = ${feeConstant},
        start_date = ${startDate},
        end_date = ${endDate},
        status = ${status},
        user_email = ${userEmail},
        owner_family_email = ${ownerFamilyEmail},
        payment_notes = ${paymentNotes}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const camelCaseUser = camelcaseKeys(result[0], { deep: true });
    return NextResponse.json(camelCaseUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user', detail: String(error) }, { status: 500 });
  }
}

// Xóa user theo id
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const result = await sql`UPDATE users SET is_deleted = 1 WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted (soft)' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user', detail: String(error) }, { status: 500 });
  }
} 