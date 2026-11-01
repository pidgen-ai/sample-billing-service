import { test } from "node:test";
import assert from "node:assert/strict";
import { invoicesCsv } from "../src/export/csv.ts";
import type { Invoice } from "../src/invoices.ts";

const invoice = (over: Partial<Invoice>): Invoice => ({
  id: "inv_1", customerId: "cus_1", number: "LS-1001", issuedAt: "2026-09-03T10:00:00Z",
  currency: "USD", amountCents: 12900, status: "paid", refundedCents: 0, ...over,
});

test("exports paid invoices with a header row", () => {
  assert.equal(invoicesCsv([invoice({})]), "number,customer,issued,currency,amount\nLS-1001,cus_1,2026-09-03,USD,129.00\n");
});

test("leaves out open invoices", () => {
  assert.equal(invoicesCsv([invoice({ status: "open" })]).trim().split("\n").length, 1);
});
