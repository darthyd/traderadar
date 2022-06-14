import matches from "./matches";
import prepareQuery from "../db";
import { RunResult } from "better-sqlite3";

const getUpdatedAt = async (): Promise<number> => {
    const { db, stmt } = await prepareQuery(`SELECT timestamp FROM updatedAt`);
    const responseQuery = stmt.get();
    db.close();
    return responseQuery.timestamp;
}

const setUpdatedAt = async (timestamp: number): Promise<RunResult> => {
    const { db, stmt } = await prepareQuery(`UPDATE updatedAt SET timestamp = (?) WHERE id = 0`);
    const responseQuery = stmt.run(timestamp);
    db.close();
    return responseQuery;
}

export default { matches, getUpdatedAt, setUpdatedAt } as any;