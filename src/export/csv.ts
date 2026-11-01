import type { Invoice } from "../invoices.ts";

const HEADER = ["number", "customer", "issued", "currency", "amount"];

const cell = (value: string) => (/[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);
const money = (cents: number) => (cents / 100).toFixed(2);

/** The monthly finance export. Finance reconciles it against the bank, so only paid invoices appear. */
export function invoicesCsv(invoices: Invoice[]): string {
  const rows = invoices
    .filter((i) => i.status === "paid")
    .map((i) => [i.number, i.customerId, i.issuedAt.slice(0, 10), i.currency, money(i.amountCents)]);
  return [HEADER, ...rows].map((row) => row.map(cell).join(",")).join("\n") + "\n";
}
