import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import camelcaseKeys from 'camelcase-keys';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    let logs;
    if (userId) {
      logs = await sql`SELECT *, timestamp AT TIME ZONE 'Asia/Ho_Chi_Minh' AS timestamp_vn FROM activity_logs WHERE user_id = ${Number(userId)} ORDER BY timestamp DESC LIMIT 20`;
    } else {
      logs = await sql`SELECT *, timestamp AT TIME ZONE 'Asia/Ho_Chi_Minh' AS timestamp_vn FROM activity_logs ORDER BY timestamp DESC LIMIT 20`;
    }
    const logsWithVNTime = logs.map((log: any) => ({ ...log, timestamp: log.timestamp_vn, timestamp_vn: undefined }));
    const camelCaseLogs = camelcaseKeys(logsWithVNTime, { deep: true });
    return NextResponse.json(camelCaseLogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logs', detail: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, action, details, changes } = await req.json();
    if (!userId || !action || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO activity_logs (id, user_id, action, details, changes)
      VALUES (
        ${crypto.randomUUID()},
        ${userId},
        ${action},
        ${details},
        ${JSON.stringify(changes)}
      )
      RETURNING *
    `;
    const camelCaseLog = camelcaseKeys(result[0], { deep: true });
    return NextResponse.json(camelCaseLog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create log', detail: String(error) }, { status: 500 });
  }
} 