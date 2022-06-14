import express, { Express } from "express";
import cors from "cors";
import Models from "./models";
import Match from "./interfaces/Match";

import getMatches from "./scrapper";
// const getMatches = require("./scrapper");

export const app: Express = express();

Models.matches.removeOldMatches();

app.use(cors());

app.get("/", (_req, res) => {
    Models.matches.removeOldMatches();
    res.json({ hello: "world"});
});

app.get("/api/update", async (_req, res) => {
    Models.setUpdatedAt(new Date().getTime());

    const liveMatches: Match[] = await getMatches.live();
    
    liveMatches.forEach((e: Match) => {
        Models.matches.insertMatch(e);
    })

    const dayMatches: Match[] = await getMatches.day();

    dayMatches.forEach((e: Match) => {
        Models.matches.insertMatch(e);
    })
    
    res.json({ ok: true });
});

app.get("/api/updatedAt", async (_req, res) => {
    const updatedAt = await Models.getUpdatedAt();
    res.json({ updatedAt });
});

app.get("/api/matches", async (_req, res) => {
    const matches = await Models.matches.getAllMatches();
    res.json(matches);
});
