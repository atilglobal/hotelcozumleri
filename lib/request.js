export function getClientIp(request) {
  const forwarded = request?.headers?.get?.("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }
  const realIp = request?.headers?.get?.("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
