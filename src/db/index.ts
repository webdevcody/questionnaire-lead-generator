import * as schema from "./schema";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
