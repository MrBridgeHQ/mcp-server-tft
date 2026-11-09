import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Teamfight Tactics MCP Server - Tool declarations
// Full implementation runs on Apify Standby: https://apify.com/mrbridge/tft-mcp-server?fpr=mrbridge

const server = new McpServer({
  name: "tft-mcp-server",
  version: "2.1.3",
});

// Shared input shapes
const region = z
  .enum(["euw1", "eun1", "na1", "kr", "br1", "la1", "la2", "oc1", "tr1", "ru", "jp1", "ph2", "sg2", "th2", "tw2", "vn2"])
  .optional()
  .default("euw1")
  .describe("Server region");
const language = z.enum(["en", "fr"]).optional().default("en").describe("Language for messages");
const puuid = z.string().min(1).describe("Player PUUID (78-character unique identifier)");
const gameName = z.string().min(1).max(16).describe("Riot ID game name (before the #)");
const tagLine = z.string().min(1).max(5).describe("Riot ID tag line (after the #)");
const matchId = z.string().min(1).describe("TFT match ID (e.g., EUW1_1234567890)");
const queueType = z
  .enum(["ranked", "normal", "all"])
  .optional()
  .describe("Queue type filter (informational: TFT match history is not filtered server-side)");

// Optional player selector shared by the analysis tools
const optPuuid = puuid.optional().describe("Player PUUID. Alternatively provide gameName + tagLine (Riot ID).");
const optGameName = gameName.optional().describe("Riot ID game name (use with tagLine instead of a puuid)");
const optTagLine = tagLine.optional().describe("Riot ID tag line (use with gameName instead of a puuid)");

// Account & Profile
server.tool(
  "tft_get_account",
  "Get a Teamfight Tactics account by Riot ID (gameName#tagLine). Returns the PUUID needed for other API calls.",
  { gameName, tagLine, region },
);

server.tool("tft_get_summoner", "Get TFT summoner information (level, profile icon) by PUUID.", { puuid, region });

server.tool(
  "tft_get_ranked",
  "Get TFT ranked information by PUUID across Ranked TFT, Hyper Roll, and Double Up queues (tier, rank, LP / rated tier, wins/losses, win rate).",
  { puuid, region },
);

server.tool(
  "tft_get_player_profile",
  "Get a complete TFT player profile including account, summoner info, and ranked stats (Ranked TFT, Hyper Roll, Double Up) by Riot ID. This is the recommended starting point for player analysis.",
  { gameName, tagLine, region },
);

// Matches & Live
server.tool(
  "tft_get_match_history",
  "Get recent TFT match IDs for a player by PUUID. Supports pagination (start) and time filtering (startTime/endTime in epoch SECONDS). Use tft_get_match_details to get the full board (placement, units, traits, augments) of each match.",
  {
    puuid,
    count: z.number().min(1).max(100).optional().default(20).describe("Number of TFT matches to retrieve (1-100, default: 20)"),
    start: z.number().min(0).optional().describe("Pagination offset: number of recent matches to skip (default: 0)"),
    startTime: z.number().min(0).optional().describe("Only include matches played after this epoch timestamp in SECONDS"),
    endTime: z.number().min(0).optional().describe("Only include matches played before this epoch timestamp in SECONDS"),
    queueType,
    region,
  },
);

server.tool(
  "tft_get_match_details",
  "Get detailed information about a specific TFT match by match ID. Returns the lobby of 8 players sorted by placement, each with their units, star levels, items, traits, augments, and Little Legend. Optionally pass a PUUID to flag the focused player.",
  {
    matchId,
    puuid: puuid.optional().describe("Optional PUUID to flag the focused player in the lobby"),
    region,
  },
);

server.tool(
  "tft_get_match_timeline",
  "Match timeline is not available for Teamfight Tactics. Use tft_get_match_details instead.",
  { matchId, region },
);

server.tool(
  "tft_get_live_game",
  "Check if a player is currently in a live TFT game and list the lobby participants and basic game info (queue, game mode, length). Teamfight Tactics has no champions or runes, so only player identities and game metadata are returned.",
  { puuid, region },
);

server.tool(
  "tft_get_champion_mastery",
  "Champion mastery is not available for Teamfight Tactics. Use tft_get_match_history + tft_analyze_champion to analyze unit performance instead.",
  {
    puuid,
    top: z.number().min(1).max(50).optional().default(10).describe("Unused: TFT has no champion mastery"),
    region,
  },
);

server.tool(
  "tft_get_featured_games",
  "Featured games are no longer available from the game publisher, so this tool only answers with a notice. Kept for compatibility.",
  { region },
);

// AI Analysis
server.tool(
  "tft_analyze_performance",
  "Analyze a TFT player's recent placement performance and provide improvement recommendations. Returns average placement, top-4 / top-1 rates, most-played units and traits, strengths, weaknesses, and tips based on rank. Pass the player as a Riot ID (gameName + tagLine) directly: no need to resolve the PUUID first.",
  {
    puuid: optPuuid,
    gameName: optGameName,
    tagLine: optTagLine,
    matchCount: z.number().min(5).max(50).optional().default(20).describe("Number of recent matches to analyze (5-50, default: 20)"),
    queueType,
    region,
    language,
  },
);

server.tool(
  "tft_analyze_champion",
  'Analyze a TFT player\'s performance with a specific unit (e.g. "Jinx", "Aphelios"). Returns games where the unit appeared, average placement when played, top-4 rate, common items on the unit, and recent boards. Pass the player as a Riot ID (gameName + tagLine) directly: no need to resolve the PUUID first.',
  {
    puuid: optPuuid,
    gameName: optGameName,
    tagLine: optTagLine,
    unitName: z.string().min(1).optional().describe('TFT unit name to analyze (e.g. "Jinx", "Aphelios")'),
    championName: z.string().min(1).optional().describe("Deprecated alias for unitName (kept for backward compatibility)"),
    matchCount: z.number().min(3).max(50).optional().default(20).describe("Number of recent matches to search for this unit (3-50, default: 20)"),
    region,
    language,
  },
);

server.tool(
  "tft_get_improvement_tips",
  "Get personalized TFT improvement tips based on recent match analysis. Provides specific, actionable advice with current vs target placement values. Pass the player as a Riot ID (gameName + tagLine) directly: no need to resolve the PUUID first.",
  {
    puuid: optPuuid,
    gameName: optGameName,
    tagLine: optTagLine,
    matchCount: z.number().min(5).max(50).optional().default(20).describe("Number of recent matches to analyze (5-50, default: 20)"),
    queueType,
    region,
    language,
  },
);

server.tool(
  "tft_compare_players",
  "Compare two TFT players side by side. Shows differences in average placement, top-4 / top-1 rates, average level, damage, and most-played units, and identifies who is performing better.",
  {
    player1: z.object({ gameName, tagLine }).describe("First player Riot ID"),
    player2: z.object({ gameName, tagLine }).describe("Second player Riot ID"),
    matchCount: z.number().min(5).max(30).optional().default(20).describe("Number of matches to analyze per player (5-30, default: 20)"),
    queueType,
    region,
    language,
  },
);

// Ladders & Platform
server.tool(
  "tft_get_league_top",
  "Get the top Teamfight Tactics players on an apex ladder (Challenger, Grandmaster, or Master) for a region, sorted by League Points. Resolves Riot IDs for the returned players.",
  {
    tier: z
      .enum(["challenger", "grandmaster", "master"])
      .optional()
      .default("challenger")
      .describe("Apex tier: challenger, grandmaster, or master"),
    count: z.number().min(1).max(50).optional().default(20).describe("Number of top players to return (1-50, default: 20)"),
    region,
  },
);

server.tool(
  "tft_get_league_entries",
  "Get a page of a Teamfight Tactics tier/division ladder (e.g. DIAMOND I) for a region. Use page to paginate. Resolves Riot IDs for the returned players.",
  {
    tier: z.enum(["DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"]).describe("Ranked tier (DIAMOND down to IRON)"),
    division: z.enum(["I", "II", "III", "IV"]).optional().default("I").describe("Division within a tier (I is highest)"),
    page: z.number().min(1).optional().default(1).describe("1-based page of the ladder (default: 1)"),
    count: z.number().min(1).max(50).optional().default(20).describe("Number of players to return from the page (1-50, default: 20)"),
    region,
  },
);

server.tool(
  "tft_get_rated_ladder",
  "Get the top Teamfight Tactics players on the Hyper Roll (Turbo) rated ladder for a region, sorted by rated rating. Resolves Riot IDs for the returned players.",
  {
    count: z.number().min(1).max(50).optional().default(20).describe("Number of top players to return (1-50, default: 20)"),
    region,
  },
);

server.tool(
  "tft_get_league_by_id",
  "Get a Teamfight Tactics league by its leagueId (UUID), including its entries with resolved Riot IDs.",
  { leagueId: z.string().min(1).describe("The league UUID (leagueId)"), region },
);

server.tool(
  "tft_get_status",
  'Get the Teamfight Tactics platform status for a region: active maintenances and incidents (title, status, severity). Reports "No active maintenances or incidents." when both are empty.',
  { region },
);
