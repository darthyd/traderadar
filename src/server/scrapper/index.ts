import Match from "../interfaces/Match";
const getDayMatches = require("./getDayMatches");
const getLiveMatches = require("./getLiveMatches");

export type getMatchesType = {
  day: () => Promise<Match[]>;
  live: () => Promise<Match[]>;
}

const getMatches = {
  day: getDayMatches,
  live: getLiveMatches,
};

export default getMatches;