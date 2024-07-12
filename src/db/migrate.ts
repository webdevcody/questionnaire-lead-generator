import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { client, db } from ".";

async function main() {
  await migrate(db, { migrationsFolder: "./migrations" });
  client.close();
}

main().catch(console.error);
