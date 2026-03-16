import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_team\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_card\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_team\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content_card\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`card_theme\` text DEFAULT 'softLinen';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_team\` DROP COLUMN \`card_theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_card\` DROP COLUMN \`card_theme\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`card_theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_team\` DROP COLUMN \`card_theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content_card\` DROP COLUMN \`card_theme\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`card_theme\`;`)
}
