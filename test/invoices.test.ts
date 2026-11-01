import { test } from "node:test";
import assert from "node:assert/strict";
import { InvoiceStore } from "../src/invoices.ts";

test("a full refund marks the invoice refunded", () => {
  const store = new InvoiceStore([{ id: "inv_1", customerId: "cus_1", number: "LS-1001", issuedAt: "2026-09-03", currency: "USD", amountCents: 5000, status: "paid", refundedCents: 0 }]);
  assert.equal(store.refund("inv_1", 5000).status, "refunded");
});
