import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE "pages_blocks_hero" ADD COLUMN "theme" text DEFAULT 'softLinen'`);
  await db.run(
    sql`ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_image_opacity" integer DEFAULT 30`,
  );
  await db.run(sql`ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "theme" text DEFAULT 'softLinen'`);
  await db.run(
    sql`ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background_image_opacity" integer DEFAULT 30`,
  );
  await db.run(sql`ALTER TABLE \`footer_nav_items\` RENAME TO \`footer_legal_links\`;`);
  await db.run(sql`CREATE TABLE \`footer_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`footer_socials_order_idx\` ON \`footer_socials\` (\`_order\`);`);
  await db.run(
    sql`CREATE INDEX \`footer_socials_parent_id_idx\` ON \`footer_socials\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_hero\`("_order", "_parent_id", "_path", "id", "theme", "background_image_image_id", "background_image_opacity", "content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "theme", "image_id", 30, "content", "block_name" FROM \`pages_blocks_hero\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_hero\` RENAME TO \`pages_blocks_hero\`;`);
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_background_image_background_image_imag_idx\` ON \`pages_blocks_hero\` (\`background_image_image_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_hero\`("_order", "_parent_id", "_path", "id", "theme", "background_image_image_id", "background_image_opacity", "content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "theme", "image_id", 30, "content", "_uuid", "block_name" FROM \`_pages_v_blocks_hero\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`);
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_hero\` RENAME TO \`_pages_v_blocks_hero\`;`);
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_background_image_background_image_i_idx\` ON \`_pages_v_blocks_hero\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_background_image_background_image_i_idx\` ON \`pages_blocks_content\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_team\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_team\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_team_background_image_background_image_imag_idx\` ON \`pages_blocks_team\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_background_image_background_imag_idx\` ON \`pages_blocks_form_block\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content_media\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content_media\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_media_background_image_background_i_idx\` ON \`pages_blocks_content_media\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content_card\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_content_card\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_card_background_image_background_im_idx\` ON \`pages_blocks_content_card\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_card_grid_background_image_background_image_idx\` ON \`pages_blocks_card_grid\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_background_image_background_imag_idx\` ON \`_pages_v_blocks_content\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_team\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_team\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_team_background_image_background_image_i_idx\` ON \`_pages_v_blocks_team\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_background_image_background_i_idx\` ON \`_pages_v_blocks_form_block\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content_media\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content_media\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_media_background_image_backgroun_idx\` ON \`_pages_v_blocks_content_media\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content_card\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_content_card\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_card_background_image_background_idx\` ON \`_pages_v_blocks_content_card\` (\`background_image_image_id\`);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`background_image_image_id\` integer REFERENCES media(id);`,
  );
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`background_image_opacity\` numeric DEFAULT 30;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_card_grid_background_image_background_im_idx\` ON \`_pages_v_blocks_card_grid\` (\`background_image_image_id\`);`,
  );
  await db.run(sql`ALTER TABLE \`team_members\` ADD \`biography\` text NOT NULL;`);
  await db.run(sql`ALTER TABLE \`footer\` ADD \`form_id\` integer NOT NULL REFERENCES forms(id);`);
  await db.run(sql`CREATE INDEX \`footer_form_idx\` ON \`footer\` (\`form_id\`);`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`footer_legal_links\` RENAME TO \`footer_nav_items\`;`);
  await db.run(sql`DROP TABLE \`footer_socials\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference' NOT NULL,
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_footer_nav_items\`("_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "label") SELECT "_order", "_parent_id", "id", "link_type", "link_new_tab", "link_url", "label" FROM \`footer_nav_items\`;`,
  );
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`);
  await db.run(sql`ALTER TABLE \`__new_footer_nav_items\` RENAME TO \`footer_nav_items\`;`);
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_hero\`("_order", "_parent_id", "_path", "id", "image_id", "content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "content", "block_name" FROM \`pages_blocks_hero\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_hero\` RENAME TO \`pages_blocks_hero\`;`);
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_hero\`("_order", "_parent_id", "_path", "id", "image_id", "content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "content", "_uuid", "block_name" FROM \`_pages_v_blocks_hero\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`);
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_hero\` RENAME TO \`_pages_v_blocks_hero\`;`);
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_image_idx\` ON \`_pages_v_blocks_hero\` (\`image_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_content\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading", "block_name" FROM \`pages_blocks_content\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_content\` RENAME TO \`pages_blocks_content\`;`);
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading\` text,
  	\`content\` text,
  	\`columns\` numeric DEFAULT 3,
  	\`relation_to\` text DEFAULT 'team-members',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_team\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading", "content", "columns", "relation_to", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading", "content", "columns", "relation_to", "block_name" FROM \`pages_blocks_team\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_team\`;`);
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_team\` RENAME TO \`pages_blocks_team\`;`);
  await db.run(
    sql`CREATE INDEX \`pages_blocks_team_order_idx\` ON \`pages_blocks_team\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_team_parent_id_idx\` ON \`pages_blocks_team\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_team_path_idx\` ON \`pages_blocks_team\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`form_id\` integer,
  	\`heading\` text,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_form_block\`("_order", "_parent_id", "_path", "id", "width", "theme", "form_id", "heading", "enable_intro", "intro_content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "form_id", "heading", "enable_intro", "intro_content", "block_name" FROM \`pages_blocks_form_block\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_pages_blocks_form_block\` RENAME TO \`pages_blocks_form_block\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_content_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`text_direction\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`image_media_id\` integer,
  	\`image_align\` text DEFAULT 'text',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_content_media\`("_order", "_parent_id", "_path", "id", "width", "theme", "text_direction", "heading", "content", "image_media_id", "image_align", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "text_direction", "heading", "content", "image_media_id", "image_align", "block_name" FROM \`pages_blocks_content_media\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_content_media\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_pages_blocks_content_media\` RENAME TO \`pages_blocks_content_media\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_media_order_idx\` ON \`pages_blocks_content_media\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_media_parent_id_idx\` ON \`pages_blocks_content_media\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_media_path_idx\` ON \`pages_blocks_content_media\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_media_image_image_media_idx\` ON \`pages_blocks_content_media\` (\`image_media_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_content_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`card_placement\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`card_heading\` text,
  	\`card_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_content_card\`("_order", "_parent_id", "_path", "id", "width", "theme", "card_placement", "heading", "content", "card_heading", "card_content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "card_placement", "heading", "content", "card_heading", "card_content", "block_name" FROM \`pages_blocks_content_card\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_content_card\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_pages_blocks_content_card\` RENAME TO \`pages_blocks_content_card\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_card_order_idx\` ON \`pages_blocks_content_card\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_card_parent_id_idx\` ON \`pages_blocks_content_card\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_card_path_idx\` ON \`pages_blocks_content_card\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading_content\` text,
  	\`heading_position\` text DEFAULT 'out',
  	\`columns\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_pages_blocks_card_grid\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading_content", "heading_position", "columns", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading_content", "heading_position", "columns", "block_name" FROM \`pages_blocks_card_grid\`;`,
  );
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_pages_blocks_card_grid\` RENAME TO \`pages_blocks_card_grid\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_card_grid_order_idx\` ON \`pages_blocks_card_grid\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_card_grid_parent_id_idx\` ON \`pages_blocks_card_grid\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`pages_blocks_card_grid_path_idx\` ON \`pages_blocks_card_grid\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_content\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading", "_uuid", "block_name" FROM \`_pages_v_blocks_content\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`);
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_blocks_content\` RENAME TO \`_pages_v_blocks_content\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading\` text,
  	\`content\` text,
  	\`columns\` numeric DEFAULT 3,
  	\`relation_to\` text DEFAULT 'team-members',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_team\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading", "content", "columns", "relation_to", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading", "content", "columns", "relation_to", "_uuid", "block_name" FROM \`_pages_v_blocks_team\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_team\`;`);
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_team\` RENAME TO \`_pages_v_blocks_team\`;`);
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_team_order_idx\` ON \`_pages_v_blocks_team\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_team_parent_id_idx\` ON \`_pages_v_blocks_team\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_team_path_idx\` ON \`_pages_v_blocks_team\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`form_id\` integer,
  	\`heading\` text,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_form_block\`("_order", "_parent_id", "_path", "id", "width", "theme", "form_id", "heading", "enable_intro", "intro_content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "form_id", "heading", "enable_intro", "intro_content", "_uuid", "block_name" FROM \`_pages_v_blocks_form_block\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`);
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_blocks_form_block\` RENAME TO \`_pages_v_blocks_form_block\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_content_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`text_direction\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`image_media_id\` integer,
  	\`image_align\` text DEFAULT 'text',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_content_media\`("_order", "_parent_id", "_path", "id", "width", "theme", "text_direction", "heading", "content", "image_media_id", "image_align", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "text_direction", "heading", "content", "image_media_id", "image_align", "_uuid", "block_name" FROM \`_pages_v_blocks_content_media\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_media\`;`);
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_blocks_content_media\` RENAME TO \`_pages_v_blocks_content_media\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_media_order_idx\` ON \`_pages_v_blocks_content_media\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_media_parent_id_idx\` ON \`_pages_v_blocks_content_media\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_media_path_idx\` ON \`_pages_v_blocks_content_media\` (\`_path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_media_image_image_media_idx\` ON \`_pages_v_blocks_content_media\` (\`image_media_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_content_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`card_placement\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`card_heading\` text,
  	\`card_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_content_card\`("_order", "_parent_id", "_path", "id", "width", "theme", "card_placement", "heading", "content", "card_heading", "card_content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "card_placement", "heading", "content", "card_heading", "card_content", "_uuid", "block_name" FROM \`_pages_v_blocks_content_card\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_card\`;`);
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_blocks_content_card\` RENAME TO \`_pages_v_blocks_content_card\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_card_order_idx\` ON \`_pages_v_blocks_content_card\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_card_parent_id_idx\` ON \`_pages_v_blocks_content_card\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_card_path_idx\` ON \`_pages_v_blocks_content_card\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`heading_content\` text,
  	\`heading_position\` text DEFAULT 'out',
  	\`columns\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new__pages_v_blocks_card_grid\`("_order", "_parent_id", "_path", "id", "width", "theme", "heading_content", "heading_position", "columns", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "heading_content", "heading_position", "columns", "_uuid", "block_name" FROM \`_pages_v_blocks_card_grid\`;`,
  );
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid\`;`);
  await db.run(
    sql`ALTER TABLE \`__new__pages_v_blocks_card_grid\` RENAME TO \`_pages_v_blocks_card_grid\`;`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_card_grid_order_idx\` ON \`_pages_v_blocks_card_grid\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_card_grid_parent_id_idx\` ON \`_pages_v_blocks_card_grid\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_card_grid_path_idx\` ON \`_pages_v_blocks_card_grid\` (\`_path\`);`,
  );
  await db.run(sql`CREATE TABLE \`__new_footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_footer\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`footer\`;`,
  );
  await db.run(sql`DROP TABLE \`footer\`;`);
  await db.run(sql`ALTER TABLE \`__new_footer\` RENAME TO \`footer\`;`);
  await db.run(sql`ALTER TABLE \`team_members\` DROP COLUMN \`biography\`;`);
}
