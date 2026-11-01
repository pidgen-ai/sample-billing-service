import { createServer } from "node:http";
import { InvoiceStore } from "./invoices.ts";
import { invoicesCsv } from "./export/csv.ts";

export function handler(store: InvoiceStore) {
  return (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname === "/invoices") {
      const customerId = url.searchParams.get("customer") ?? undefined;
      res.setHeader("content-type", "application/json");
      return res.end(JSON.stringify(store.list({ customerId })));
    }
    if (url.pathname === "/exports/invoices.csv") {
      const month = url.searchParams.get("month") ?? undefined;
      res.setHeader("content-type", "text/csv");
      return res.end(invoicesCsv(store.list({ month })));
    }
    res.statusCode = 404;
    res.end();
  };
}

if (import.meta.main) createServer(handler(new InvoiceStore())).listen(8080);
