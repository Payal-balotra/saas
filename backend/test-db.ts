import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function test() {
  try {
    const result = await sql`SELECT current_database(), current_user`;

    console.log("DATABASE CONNECTION SUCCESS:");
    console.log(result);

    await sql.end();
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:");
    console.error(error);
  }
}

test();