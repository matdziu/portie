import { exec } from "child_process";
import { config } from "dotenv";
import * as path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);
config({ path: path.resolve(process.cwd(), ".env.local") });
config();

async function runPrismaMigrateDeploy(): Promise<void> {
  const schemaName = "public";
  try {
    const databaseUrlObject = new URL(process.env.DATABASE_URL ?? "");
    databaseUrlObject.searchParams.set("schema", schemaName);
    const databaseUrl = databaseUrlObject.toString();

    process.env.DATABASE_URL = databaseUrl;

    const { stdout, stderr } = await execPromise("npx prisma migrate deploy", {
      env: process.env,
    });

    if (stdout) {
      console.log(`Schema ${schemaName}: \n${stdout}`);
    }
    if (stderr) {
      console.log(`Schema ${schemaName}: \n${stderr}`);
    }
    console.log(
      `Successfully ran prisma migrate deploy for schema: ${schemaName}`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error running Prisma migrate deploy for schema ${schemaName}:`,
        error.message
      );
    }
    throw error;
  }

  console.log("\n\n");
}

runPrismaMigrateDeploy();
