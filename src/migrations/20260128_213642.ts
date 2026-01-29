import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_team\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_team\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_card_background_image_card_background__idx\` ON \`pages_blocks_team\` (\`card_background_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_card\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_card\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_card_card_background_image_card_bac_idx\` ON \`pages_blocks_content_card\` (\`card_background_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_card_background_image_card_backgr_idx\` ON \`pages_blocks_card_grid\` (\`card_background_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_team\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_team\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_card_background_image_card_backgrou_idx\` ON \`_pages_v_blocks_team\` (\`card_background_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content_card\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content_card\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_card_card_background_image_card__idx\` ON \`_pages_v_blocks_content_card\` (\`card_background_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`card_background_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`card_background_image_opacity\` numeric DEFAULT 30;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_card_background_image_card_bac_idx\` ON \`_pages_v_blocks_card_grid\` (\`card_background_image_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`heading\` text,
  	\`content\` text,
  	\`columns\` numeric DEFAULT 3,
  	\`relation_to\` text DEFAULT 'team-members',
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_team\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading", "content", "columns", "relation_to", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading", "content", "columns", "relation_to", "block_name" FROM \`pages_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_team\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_team\` RENAME TO \`pages_blocks_team\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_order_idx\` ON \`pages_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_parent_id_idx\` ON \`pages_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_path_idx\` ON \`pages_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_team_background_image_background_image_imag_idx\` ON \`pages_blocks_team\` (\`background_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_content_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`card_placement\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`card_heading\` text,
  	\`card_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_content_card\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "card_placement", "heading", "content", "card_heading", "card_content", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "card_placement", "heading", "content", "card_heading", "card_content", "block_name" FROM \`pages_blocks_content_card\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_card\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_content_card\` RENAME TO \`pages_blocks_content_card\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_card_order_idx\` ON \`pages_blocks_content_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_card_parent_id_idx\` ON \`pages_blocks_content_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_card_path_idx\` ON \`pages_blocks_content_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_card_background_image_background_im_idx\` ON \`pages_blocks_content_card\` (\`background_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`heading_content\` text,
  	\`heading_position\` text DEFAULT 'out',
  	\`columns\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_card_grid\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading_content", "heading_position", "columns", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading_content", "heading_position", "columns", "block_name" FROM \`pages_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_card_grid\` RENAME TO \`pages_blocks_card_grid\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_order_idx\` ON \`pages_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_parent_id_idx\` ON \`pages_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_path_idx\` ON \`pages_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_background_image_background_image_idx\` ON \`pages_blocks_card_grid\` (\`background_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`heading\` text,
  	\`content\` text,
  	\`columns\` numeric DEFAULT 3,
  	\`relation_to\` text DEFAULT 'team-members',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_team\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading", "content", "columns", "relation_to", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading", "content", "columns", "relation_to", "_uuid", "block_name" FROM \`_pages_v_blocks_team\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_team\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_team\` RENAME TO \`_pages_v_blocks_team\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_order_idx\` ON \`_pages_v_blocks_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_parent_id_idx\` ON \`_pages_v_blocks_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_path_idx\` ON \`_pages_v_blocks_team\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_team_background_image_background_image_i_idx\` ON \`_pages_v_blocks_team\` (\`background_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_content_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`card_placement\` text DEFAULT 'right',
  	\`heading\` text,
  	\`content\` text,
  	\`card_heading\` text,
  	\`card_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_content_card\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "card_placement", "heading", "content", "card_heading", "card_content", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "card_placement", "heading", "content", "card_heading", "card_content", "_uuid", "block_name" FROM \`_pages_v_blocks_content_card\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_card\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_content_card\` RENAME TO \`_pages_v_blocks_content_card\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_card_order_idx\` ON \`_pages_v_blocks_content_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_card_parent_id_idx\` ON \`_pages_v_blocks_content_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_card_path_idx\` ON \`_pages_v_blocks_content_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_card_background_image_background_idx\` ON \`_pages_v_blocks_content_card\` (\`background_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`width\` text DEFAULT 'block',
  	\`theme\` text DEFAULT 'softLinen',
  	\`background_image_image_id\` integer,
  	\`background_image_opacity\` numeric DEFAULT 30,
  	\`heading_content\` text,
  	\`heading_position\` text DEFAULT 'out',
  	\`columns\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_card_grid\`("_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading_content", "heading_position", "columns", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "width", "theme", "background_image_image_id", "background_image_opacity", "heading_content", "heading_position", "columns", "_uuid", "block_name" FROM \`_pages_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_card_grid\` RENAME TO \`_pages_v_blocks_card_grid\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_order_idx\` ON \`_pages_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_parent_id_idx\` ON \`_pages_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_path_idx\` ON \`_pages_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_background_image_background_im_idx\` ON \`_pages_v_blocks_card_grid\` (\`background_image_image_id\`);`)
}
