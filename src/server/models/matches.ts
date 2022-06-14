import { RunResult } from "better-sqlite3";
import prepareQuery from "../db";
import Match from "../interfaces/Match";

const insertMatch = async (match: Match): Promise<RunResult | void> => {
  const compare: Match[] | any = await getMatchById(match.id);
  if (compare?.id === match.id) return;
  const timestamp = new Date().getTime();
  const { db, stmt } = await prepareQuery(`INSERT INTO matches (id, home, away, timestamp) VALUES (?, ?, ?, ?)`);
  const responseQuery = stmt.run(match.id, match.home, match.away, timestamp);
  db.close();
  return responseQuery;
};

const getAllMatches = async () => {
  const { db, stmt } = await prepareQuery(`SELECT * FROM matches`);
  const responseQuery = stmt.all();
  db.close();
  return responseQuery;
};

const getMatchById = async (id: Match["id"]): Promise<Match | unknown> => {
  const { db, stmt } = await prepareQuery(`SELECT * FROM matches WHERE id = ?`);
  const responseQuery = stmt.get(id);
  db.close();
  return responseQuery;
};

const removeAllMatches = async (): Promise<RunResult> => {
  const { db, stmt } = await prepareQuery(`DELETE FROM matches`);
  const responseQuery = stmt.run();
  db.close();
  return responseQuery;
};

const removeMatchById = async (id: Match["id"]): Promise<RunResult> => {
  const { db, stmt } = await prepareQuery(`DELETE FROM matches WHERE id = ?`);
  const responseQuery = stmt.run(id);
  db.close();
  return responseQuery;
};

const removeOldMatches = async (): Promise<RunResult> => {
  const oldTime = new Date().getTime() - (1000 * 60 * 60 * 24);
  const { db, stmt } = await prepareQuery(`DELETE FROM matches WHERE timestamp < ?`);
  const responseQuery = stmt.run(oldTime);
  db.close();
  return responseQuery;
};

export default {
  insertMatch,
  getAllMatches,
  removeAllMatches,
  getMatchById,
  removeMatchById,
  removeOldMatches,
};
