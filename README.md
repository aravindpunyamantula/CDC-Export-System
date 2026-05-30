# CDC Export System

## Project Overview

The CDC Export System is a backend service designed to simulate Change Data Capture (CDC) export workflows commonly used in enterprise data integration platforms.

The system exports user data from a PostgreSQL database into CSV files using three export strategies:

1. Full Export
2. Incremental Export
3. Delta Export

The application tracks export progress using consumer-specific watermarks, ensuring that incremental and delta exports only process records that have changed since the previous successful export.

The system is fully containerized using Docker and Docker Compose and includes automated database initialization, schema migrations, data seeding, structured logging, and comprehensive automated testing.

---

## Key Features

### Full Export

Exports all active (non-deleted) users from the database.

### Incremental Export

Exports only users whose `updatedAt` timestamp is greater than the consumer's last successful watermark.

### Delta Export

Exports changes since the last watermark and classifies records as:

* INSERT
* UPDATE
* DELETE

### Watermark Tracking

Each consumer maintains an independent watermark, enabling multiple downstream consumers to export data without interfering with each other.

### Asynchronous Processing

Export requests return immediately while export processing continues in the background.

### CSV Generation

Generated CSV files are stored in the output directory.

### Automated Data Seeding

The database is automatically populated with 100,000 sample users for testing and benchmarking.

### Structured Logging

Export jobs generate structured logs for observability and troubleshooting.

---

# Architecture

The project follows a layered architecture to separate concerns and improve maintainability.

```text
Client
  |
  v
Routes
  |
  v
Controllers
  |
  v
Jobs
  |
  v
Services
  |
  v
Database / File System
```

## Components

### Routes

Responsible for endpoint registration and request routing.

Location:

```text
src/routes
```

### Controllers

Responsible for:

* Request validation
* Consumer identification
* Response generation
* Job triggering

Location:

```text
src/controllers
```

### Jobs

Responsible for:

* Asynchronous export execution
* Structured logging
* Error handling

Location:

```text
src/jobs
```

### Services

Responsible for:

* Database querying
* CDC business logic
* CSV generation
* Watermark management

Location:

```text
src/services
```

### Utilities

Reusable helper functions including:

* Consumer validation
* File generation
* CSV headers
* Watermark helpers
* Export metadata

Location:

```text
src/utils
```

---

# Project Structure

```text
src
├── controllers
├── jobs
├── routes
├── services
├── utils
├── prisma.ts
├── app.ts
└── server.ts

prisma
├── migrations
├── schema.prisma
└── seed.ts

tests
├── controller tests
├── service tests
├── utility tests
└── job tests

output
└── generated csv exports
```

---

# Technology Stack

## Backend

* Node.js
* TypeScript
* Express.js

## Database

* PostgreSQL
* Prisma ORM

## Containerization

* Docker
* Docker Compose

## Testing

* Jest
* Supertest

---

# Setup Instructions

## Prerequisites

Install:

* Docker
* Docker Compose
* Node.js 20+
* npm

---

## Clone Repository

```bash
git clone <repository-url>
cd cdc-export-system
```

---

## Install Dependencies

```bash
npm install
```

---

# Docker Setup

## Build and Start Containers

```bash
docker compose up --build
```

The startup process automatically performs:

1. Database initialization
2. Prisma client generation
3. Database migration execution
4. Data seeding
5. Application startup

---

## Stop Containers

```bash
docker compose down
```

---

# Running Locally

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migrations

```bash
npx prisma migrate dev
```

## Seed Database

```bash
npx prisma db seed
```

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:8080
```

---

# API Documentation

## Health Check

### Request

```http
GET /health
```

### Response

```json
{
  "status": "ok"
}
```

---

## Full Export

### Request

```http
POST /exports/full
```

Headers:

```http
X-Consumer-ID: consumer-1
```

### Response

```json
{
  "jobId": "uuid",
  "status": "started",
  "exportType": "full",
  "outputFilename": "full_consumer-1_timestamp.csv"
}
```

---

## Incremental Export

### Request

```http
POST /exports/incremental
```

Headers:

```http
X-Consumer-ID: consumer-1
```

### Behavior

Exports records with:

```sql
updatedAt > lastExportedAt
```

---

## Delta Export

### Request

```http
POST /exports/delta
```

Headers:

```http
X-Consumer-ID: consumer-1
```

### Operation Types

| Condition           | Operation |
| ------------------- | --------- |
| New record          | INSERT    |
| Modified record     | UPDATE    |
| Soft deleted record | DELETE    |

---

## Get Watermark

### Request

```http
GET /exports/watermark
```

Headers:

```http
X-Consumer-ID: consumer-1
```

### Response

```json
{
  "consumerId": "consumer-1",
  "lastExportedAt": "timestamp"
}
```

---

# CDC Design

The application uses a watermark-based CDC strategy.

## Full Export

```text
Export all active users
Update watermark
```

## Incremental Export

```text
Read watermark
Export changed records
Update watermark
```

## Delta Export

```text
Read watermark
Determine operation type
Generate delta CSV
Update watermark
```

Watermarks are updated only after successful export completion to prevent data loss.

---

# Testing

The project uses Jest for unit testing.

Test categories include:

* Controller tests
* Service tests
* Utility tests
* Job tests

Run all tests:

```bash
npm test
```

Run coverage:

```bash
npm test -- --coverage
```

---

# Coverage Report

Latest coverage results:

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 90.57%   |
| Branches   | 50.00%   |
| Functions  | 94.44%   |
| Lines      | 90.57%   |

Coverage reports are generated in:

```text
coverage/lcov-report/index.html
```

---

# Assumptions

1. User deletions are implemented as soft deletes using the `isDeleted` flag.
2. Watermarks are maintained independently for each consumer.
3. Export jobs execute asynchronously within the application process.
4. CSV files are stored locally in the output directory.
5. Consumers provide a valid `X-Consumer-ID` header for all export operations.

---

# Trade-offs

## Asynchronous Processing

Background jobs are executed within the application process rather than using a dedicated queueing system.

Advantages:

* Simpler implementation
* Easier deployment
* Lower operational complexity

Limitations:

* Not horizontally scalable for extremely large workloads

---

## Local File Storage

CSV files are stored locally instead of using object storage services such as Amazon S3.

Advantages:

* Simpler setup
* Easy local testing

Limitations:

* Not suitable for distributed production environments

---

## Watermark Strategy

A timestamp-based watermark approach was selected because it is straightforward to implement and aligns well with CDC export requirements.

Advantages:

* Easy to understand
* Efficient incremental querying

Limitations:

* Requires reliable timestamp management

---

# Author

Aravind Kumar

CDC Export System Assignment Submission
