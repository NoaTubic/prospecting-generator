const requests = new Map<string, number[]>();
const RATE_LIMIT = 10;
const WINDOW = 60_000;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requests.get(ip)?.filter((t) => now - t < WINDOW) || [];
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  requests.set(ip, timestamps);
  return false;
}
