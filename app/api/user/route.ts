import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import camelcaseKeys from 'camelcase-keys';

// Lấy tất cả user hoặc tạo user mới
export async function GET() {
  try {
    const users = await sql`SELECT * FROM users`;
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
      fees,
      startDate,
      endDate,
      status,
      userEmail,
      ownerFamilyEmail
    } = await req.json();
    if (!description || duration === undefined || available === undefined || fees === undefined || !startDate || !endDate || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO users (description, duration, available, fees, startDate, endDate, status, userEmail, ownerFamilyEmail)
      VALUES (${description}, ${duration}, ${available}, ${fees}, ${startDate}, ${endDate}, ${status}, ${userEmail}, ${ownerFamilyEmail})
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user', detail: String(error) }, { status: 500 });
  }
} 