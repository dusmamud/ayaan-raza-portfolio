import { defineConfig } from 'drizzle-kit';

// Tier B placeholder (Phase 4). Drizzle reads this only when
// db:generate / db:migrate run. No database exists in Phase 1.
export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dbCredentials: { url: process.env.DATABASE_URL ?? '' }
});
