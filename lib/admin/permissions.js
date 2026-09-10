const SUPER_ONLY = ["/admin/kullanicilar"];

export function canAccessRoute(role, pathname) {
  if (role === "SUPER_ADMIN") return true;
  return !SUPER_ONLY.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function canDeleteAdmin(actorRole, targetRole) {
  if (targetRole === "SUPER_ADMIN") return false;
  return actorRole === "SUPER_ADMIN";
}
