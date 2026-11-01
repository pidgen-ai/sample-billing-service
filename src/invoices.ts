export type InvoiceStatus = "draft" | "open" | "paid" | "refunded" | "void";

export interface Invoice {
  id: string;
  customerId: string;
  number: string;
  issuedAt: string; // ISO date
  currency: "USD" | "EUR" | "GBP";
  amountCents: number;
  status: InvoiceStatus;
  refundedCents: number;
}

/** In-memory store; the real deployment reads Postgres through the same interface. */
export class InvoiceStore {
  #invoices = new Map<string, Invoice>();

  constructor(seed: Invoice[] = []) {
    for (const invoice of seed) this.#invoices.set(invoice.id, invoice);
  }

  list(filter: { customerId?: string; month?: string } = {}): Invoice[] {
    return [...this.#invoices.values()]
      .filter((i) => !filter.customerId || i.customerId === filter.customerId)
      .filter((i) => !filter.month || i.issuedAt.startsWith(filter.month))
      .sort((a, b) => a.issuedAt.localeCompare(b.issuedAt));
  }

  refund(id: string, cents: number): Invoice {
    const invoice = this.#invoices.get(id);
    if (!invoice) throw new Error(`no invoice ${id}`);
    if (invoice.status !== "paid") throw new Error(`invoice ${id} is ${invoice.status}`);
    const refundedCents = Math.min(invoice.amountCents, invoice.refundedCents + cents);
    const updated = { ...invoice, refundedCents, status: refundedCents === invoice.amountCents ? "refunded" as const : "paid" as const };
    this.#invoices.set(id, updated);
    return updated;
  }
}
