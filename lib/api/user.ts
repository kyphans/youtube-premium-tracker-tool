export async function getUsers() {
  const res = await fetch('/api/user');
  return res.json();
}

export async function createUser(data: any) {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: string, data: any) {
  const res = await fetch(`/api/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`/api/user/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}