---
title: Vervechka
summary: A platform for small private schools in Ukraine. Parents see their child's day, photos, menu and payments; the school runs contracts, invoices, the class journal and communication.
group: product
status: Design stage, preparing a pilot
stack: [Go, PostgreSQL, River, React, React Native (planned)]
order: 3
---

## The idea

Small private primary schools (up to about 80 pupils) run on a mix of Telegram chats,
spreadsheets and paper. The most widely used school systems in Ukraine are electronic journals,
adopted mostly by state schools. A small private school also needs the business side: contracts,
monthly fees with clubs and meals billed separately, a holiday camp open to outside children,
and a lot of photos for parents.

Vervechka starts with the primary school and is designed to extend later to a kindergarten and
a development centre run by the same owner. The name means a line of children walking hand in
hand; it is also a Hutsul brass necklace.

## Where it is now

The project is at the design stage, and I'm treating the design as a deliverable in its own
right:

- an architecture document covering hosting, resource estimates, the data model, security, the
  parents' app, payments, the camp, Telegram and Google Drive integration, and a roadmap;
- market research on school software in Ukraine and the niche this fills;
- a complete PostgreSQL schema for one school (99 tables) with functions for a pupil's agenda,
  "what is happening right now" and a billing preview;
- ten scenario tests against that schema, including the real structure of the pilot school with
  a mixed-age class, a child's day, the holiday camp, several payment recipients for one child,
  and a child enrolled in more than one unit.

The pilots are planned with two independent organisations in different cities, each running a
development centre, a kindergarten and a primary school. The real pilot school has 16 children,
so the main product lesson is that setup has to take an hour, not a week: these schools have
no IT person.

## Decisions worth explaining

### One instance per school

Each school gets its own application container and its own database, while sharing one Docker
image, the servers and a central control plane. Children's data cannot leak between schools,
because there is no query to get wrong: the schema has no `school_id` column at all, the
instance is the school. Exporting or deleting a school's data is a single `pg_dump` or
`DROP DATABASE`, and it is easy to explain to a school owner.

The cost is operational, so three rules apply from day one: one image and one code version for
everyone (schools differ only in config and module flags), backward-compatible migrations so
instances can be upgraded in waves, and a new school created by a single command from the
control plane, including its database, subdomain, backups and monitoring.

### A deliberately boring stack

At this scale, Kafka, Elasticsearch and Kubernetes would be cost without benefit, even though
they are my day job. The plan is a single Go binary with two modes (API and worker), PostgreSQL
for data, full-text search and the job queue (River), and S3-compatible storage for photos and
PDFs. Fewer moving parts per instance means a school can run on a very small server.

### The schema first

Schools differ in ways that are expensive to discover late: combined classes, children in two
units, siblings, fees split between recipients, a camp that is free for pupils but paid for
outsiders. Writing the schema and testing it against a real school's structure before any
application code is the cheapest place to find those cases.

### No online payments in the first version

Instead of card acquiring, the first version sends parents payment details from templates, with
separate recipients for tuition, clubs and meals where the school needs it. It solves the real
problem (parents knowing what to pay and to whom) without a payment provider, contracts or
compliance work before the product has proven itself.

The design documents are private. I'm happy to walk through them on a call.
