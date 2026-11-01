# billing-service: a Pidgen sample

A small repository to try [Pidgen](https://pidgen.ai) on when you don't want to start with your own
code. It's the repository the Pidgen onboarding video uses: connect it to a Project, plan a change
in your coding agent, file the plan with the Pidgen skills, and watch the tickets run to merged
pull requests.

**To use it:** choose **Use this template** on GitHub to make your own copy, then connect that
copy in Pidgen's setup. Pidgen works in your copy, never in this repository.

## The service

Larkspur is a made-up company that bills subscription businesses. This is its invoicing service:
invoices, payments, refunds and the monthly finance export. About 100 lines of TypeScript with no
dependencies, so an agent's change is small enough to read in one sitting.

```sh
npm test     # node --test, no dependencies (Node 24+)
npm start    # http://localhost:8080
```

- `GET /invoices?customer=<id>` lists a customer's invoices.
- `GET /exports/invoices.csv?month=2026-09` is the monthly finance export (paid invoices only).

## Things to ask for

The code has a few gaps on purpose, each a good first plan:

- **Refunds:** `InvoiceStore.refund` quietly caps a refund larger than the remaining balance
  instead of refusing it, and nothing reports how much of an invoice is still refundable.
- **Finance export:** the monthly CSV lists paid invoices only, so refunds are reconciled by hand;
  it can't be filtered by currency either.

## License

[Apache-2.0](LICENSE)
