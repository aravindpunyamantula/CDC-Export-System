#!/bin/sh

echo "Waiting for database.."
sleep 5
echo "Running migrations.."
npx prisma migrate deploy
echo "Generating Prisma client.."
npx prisma generate
echo "Starting application.."
npm run dev