import Database from "better-sqlite3";

const DB_FILE = "./src/server/db/database.db";

if (!DB_FILE) {
  throw new Error("DB_FILE is not defined");
}

// connect
export const connect = () => {
  return new Promise<Database.Database>((resolve, _reject) => {
    const db = new Database(DB_FILE);
    resolve(db);
  });
};


// create an statement to run a query
const prepareQuery = async (query: string) => {
  const db = await connect();
  const stmt = db.prepare(query);
  return { db, stmt }
}

export default prepareQuery;