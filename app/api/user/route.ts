import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import camelcaseKeys from 'camelcase-keys';

// Lấy tất cả user hoặc tạo user mới
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const status = searchParams.get('status');
    let users;
    if (status) {
      users = await sql`SELECT * FROM users WHERE status = ${status} AND is_deleted = 0`;
    } else {
      users = await sql`SELECT * FROM users WHERE is_deleted = 0`;
    }
    const camelCaseUsers = camelcaseKeys(users, { deep: true });
    return NextResponse.json(camelCaseUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users', detail: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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
    } = await req.json();
    if (!description || duration === undefined || available === undefined || feeConstant === undefined || !startDate || !endDate || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO users (description, duration, available, fee_constant, start_date, end_date, status, user_email, owner_family_email, payment_notes)
      VALUES (${description}, ${duration}, ${available}, ${feeConstant}, ${startDate}, ${endDate}, ${status}, ${userEmail}, ${ownerFamilyEmail}, ${paymentNotes})
      RETURNING *
    `;
    const camelCaseUser = camelcaseKeys(result[0], { deep: true });
    return NextResponse.json(camelCaseUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user', detail: String(error) }, { status: 500 });
  }
} 