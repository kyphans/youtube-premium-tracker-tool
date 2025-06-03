export async function getLogs(userId?: number) {
  const url = userId ? `/api/logs?userId=${userId}` : '/api/logs';
  const res = await fetch(url);
  return res.json();
}

export async function createLog(data: {
  userId: number;
  action: string;
  details: string;
  changes?: { field: string; oldValue: any; newValue: any; }[];
}) {
  const res = await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
} 