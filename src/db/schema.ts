import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
// 	id: integer().primaryKey().generatedAlwaysAsIdentity(),
// 	name: varchar({ length: 255 }).notNull(),
// 	age: integer().notNull(),
// 	email: varchar({ length: 255 }).notNull().unique(),
// });

export const blogsTable = pgTable("blogs", {
	blogId: uuid("blog_id").defaultRandom().primaryKey(),
	categories: text().array().notNull().default(["TECH", "NEWS"]),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 500 }).notNull(),
	content: varchar({ length: 5000 }).notNull(),
	coverImage: uuid("cover_image")
		.notNull()
		.references(() => blogImages.imageId),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogImages = pgTable("blog_images", {
	imageId: uuid("image_id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	mimeType: text("mime_type").notNull(), // store so you can serve it back
	imageUrl: text("image_url").notNull(), // URL of the image stored in S3
	createdAt: timestamp("created_at").defaultNow(),
});
