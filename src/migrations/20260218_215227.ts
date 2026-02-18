import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_logo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`light_id\` integer NOT NULL,
  	\`dark_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`light_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`DROP TABLE \`logo\`;`);
  await db.run(sql`ALTER TABLE \`__new_logo\` RENAME TO \`logo\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE INDEX \`logo_light_idx\` ON \`logo\` (\`light_id\`);`);
  await db.run(sql`CREATE INDEX \`logo_dark_idx\` ON \`logo\` (\`dark_id\`);`);
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'None',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_checkbox\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "required", "default_value", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "required", "default_value", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_checkbox\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_forms_blocks_checkbox\` RENAME TO \`forms_blocks_checkbox\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'None',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_select\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "placeholder", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "placeholder", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_select\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`);
  await db.run(sql`ALTER TABLE \`__new_forms_blocks_select\` RENAME TO \`forms_blocks_select\`;`);
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_radio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'None',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_radio\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_radio\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_radio\`;`);
  await db.run(sql`ALTER TABLE \`__new_forms_blocks_radio\` RENAME TO \`forms_blocks_radio\`;`);
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_order_idx\` ON \`forms_blocks_radio\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_parent_id_idx\` ON \`forms_blocks_radio\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_path_idx\` ON \`forms_blocks_radio\` (\`_path\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_logo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`DROP TABLE \`logo\`;`);
  await db.run(sql`ALTER TABLE \`__new_logo\` RENAME TO \`logo\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(sql`CREATE INDEX \`logo_media_idx\` ON \`logo\` (\`media_id\`);`);
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'none',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_checkbox\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "required", "default_value", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "required", "default_value", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_checkbox\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_forms_blocks_checkbox\` RENAME TO \`forms_blocks_checkbox\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'none',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_select\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "placeholder", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "placeholder", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_select\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`);
  await db.run(sql`ALTER TABLE \`__new_forms_blocks_select\` RENAME TO \`forms_blocks_select\`;`);
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_forms_blocks_radio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`early_exit_value\` text,
  	\`conditional_redirect_redirect\` text DEFAULT 'none',
  	\`conditional_redirect_value\` text,
  	\`mailer_lite_key\` text DEFAULT 'none',
  	\`dubsado_key\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_forms_blocks_radio\`("_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name") SELECT "_order", "_parent_id", "_path", "id", "name", "label", "width", "default_value", "required", "early_exit_value", "conditional_redirect_redirect", "conditional_redirect_value", "mailer_lite_key", "dubsado_key", "block_name" FROM \`forms_blocks_radio\`;`,
  );
  await db.run(sql`DROP TABLE \`forms_blocks_radio\`;`);
  await db.run(sql`ALTER TABLE \`__new_forms_blocks_radio\` RENAME TO \`forms_blocks_radio\`;`);
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_order_idx\` ON \`forms_blocks_radio\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_parent_id_idx\` ON \`forms_blocks_radio\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`forms_blocks_radio_path_idx\` ON \`forms_blocks_radio\` (\`_path\`);`,
  );
}
