require('dotenv').config();
import { symbols } from "../utils/symbols";

const API_URL: string = process.env.API_URL || '';

export async function fetchPrices(symbol: string) {
  if (!API_URL) return { error: 'API_URL is not defined' };
  if (!symbols.includes(symbol)) return { error: `Invalid symbol. Available symbols are: ${symbols.join(', ')}` };

  const res = await fetch(`${API_URL}?symbol=${symbol}`);

  if (!res.ok) throw new Error('Failed to fetch prices');

  const data = await res.json();
  return data;
}
