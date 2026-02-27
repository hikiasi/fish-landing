#!/bin/sh
set -e

echo "Pushing schema to database..."
npx prisma db push

echo "Seeding database..."
npx tsx prisma/seed.ts

echo "Starting application..."
exec npm start
