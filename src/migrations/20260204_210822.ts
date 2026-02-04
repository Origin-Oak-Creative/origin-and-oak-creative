import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`form_submissions\` ADD \`dubsado_sync_status\` text DEFAULT 'na';`)
  await db.run(sql`ALTER TABLE \`form_submissions\` ADD \`mailer_lite_sync_status\` text DEFAULT 'na';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`dubsado_sync_status\`;`)
  await db.run(sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`mailer_lite_sync_status\`;`)
}
