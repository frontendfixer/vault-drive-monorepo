#!/usr/bin/env node

/**
 * Post-generation script to fix TypeScript type annotations in Prisma generated files.
 * This fixes the TS2742 error for DbNull, JsonNull, and AnyNull exports.
 */

const fs = require('fs');
const path = require('path');

const prismaNamespacePath = path.join(
  __dirname,
  '..',
  'prisma',
  'generated',
  'prisma',
  'internal',
  'prismaNamespace.ts'
);

try {
  if (!fs.existsSync(prismaNamespacePath)) {
    console.log('Prisma namespace file not found, skipping fix.');
    process.exit(0);
  }

  let content = fs.readFileSync(prismaNamespacePath, 'utf8');

  // Fix DbNull export
  content = content.replace(
    /export const DbNull = runtime\.DbNull/g,
    'export const DbNull: typeof runtime.DbNull = runtime.DbNull'
  );

  // Fix JsonNull export
  content = content.replace(
    /export const JsonNull = runtime\.JsonNull/g,
    'export const JsonNull: typeof runtime.JsonNull = runtime.JsonNull'
  );

  // Fix AnyNull export
  content = content.replace(
    /export const AnyNull = runtime\.AnyNull/g,
    'export const AnyNull: typeof runtime.AnyNull = runtime.AnyNull'
  );

  fs.writeFileSync(prismaNamespacePath, content, 'utf8');
  console.log('✅ Fixed Prisma type annotations in prismaNamespace.ts');
} catch (error) {
  console.error('❌ Error fixing Prisma types:', error.message);
  process.exit(1);
}

