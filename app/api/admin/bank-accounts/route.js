import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async () => {
  const rows = await query("SELECT * FROM bank_accounts ORDER BY sort_order, bank_name");
  return NextResponse.json({ accounts: rows });
});

export const POST = withAdmin(async (request) => {
  const d = await request.json();
  const result = await query(
    "INSERT INTO bank_accounts (bank_name, account_holder, iban, branch, account_number, currency, description, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [d.bank_name, d.account_holder, d.iban, d.branch, d.account_number, d.currency || "TRY", d.description, d.sort_order || 0, d.status || "active"]
  );
  return NextResponse.json({ success: true, id: result.insertId });
});

export const PUT = withAdmin(async (request) => {
  const d = await request.json();
  await query(
    "UPDATE bank_accounts SET bank_name=?, account_holder=?, iban=?, branch=?, account_number=?, currency=?, description=?, sort_order=?, status=? WHERE id=?",
    [d.bank_name, d.account_holder, d.iban, d.branch, d.account_number, d.currency, d.description, d.sort_order, d.status, d.id]
  );
  return NextResponse.json({ success: true });
});
