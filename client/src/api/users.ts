const API = import.meta.env.VITE_API_URL!;

export type CreateUserBody = {
  email: string;
  name: string;
  password: string;
};

export type UserRow = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

async function parseError(res: Response) {
  const data = await res.json().catch(() => ({}));
  const msg = Array.isArray(data?.message) ? data.message[0] : data?.message;
  return msg || `HTTP ${res.status}`;
}

export async function createUser(body: CreateUserBody) {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(await parseError(res));
  
  return data;
}



export async function listUsers(): Promise<UserRow[]> {
  const res = await fetch(`${API}/users`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function deleteUserById(id: number): Promise<void> {
  const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await parseError(res));
}