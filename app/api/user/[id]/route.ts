import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../../lib/db';
import { User } from '../../../../types';

// Lấy user theo id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const result = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user', detail: String(error) }, { status: 500 });
  }
}

// Cập nhật user theo id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const {
      description,
      duration,
      available,
      fees,
      startDate,
      endDate,
      status,
      userEmail,
      ownerFamilyEmail
    } = await req.json();
    const result = await sql<User>`
      UPDATE users SET
        description = ${description},
        duration = ${duration},
        available = ${available},
        fees = ${fees},
        startDate = ${startDate},
        endDate = ${endDate},
        status = ${status},
        userEmail = ${userEmail},
        ownerFamilyEmail = ${ownerFamilyEmail}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user', detail: String(error) }, { status: 500 });
  }
}

// Xóa user theo id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const result = await sql<User>`DELETE FROM users WHERE id = ${id} RETURNING *`;
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user', detail: String(error) }, { status: 500 });
  }
} 