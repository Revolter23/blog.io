import { InferSelectModel } from "drizzle-orm";
import { blogsTable, blogImages } from "@/src/db/schema";

export type Blog = InferSelectModel<typeof blogsTable>;

export type BlogImage = InferSelectModel<typeof blogImages>;
