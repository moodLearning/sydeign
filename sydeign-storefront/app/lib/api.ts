// app/lib/api.ts

const BASE = import.meta.env.PUBLIC_API_BASE;

export async function getPing() {
  const res = await fetch(`${BASE}/ping`);
  if (!res.ok) throw new Error("API failed");
  return res.json();
}

const API = "http://127.0.0.1:8000/api";

export async function getProducts() {
  const response = await fetch(`${API}/products`);
  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(`${API}/products/${id}`);
  return response.json();
}

export async function getShops() {
  const response = await fetch(`${API}/shops`);
  return response.json();
}

export async function getShop(id: string) {
  const response = await fetch(`${API}/shops/${id}`);
  return response.json();
}
