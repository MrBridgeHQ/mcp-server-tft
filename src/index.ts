import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Teamfight Tactics MCP Server - Tool declarations
// Full implementation runs on Apify Standby: https://apify.com/mrbridge/teamfight-tactics-mcp-server---ai-game-analysis?fpr=mrbridge

const server = new McpServer({
  name: "tft-mcp-server",
  version: "1.0.0",
});

server.tool("tft_get_account", "Get TFT account info by Riot ID", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region (euw1, na1, kr, br1, etc.)"),
});

server.tool("tft_get_ranked", "Get TFT ranked stats (tier, rank, LP, wins/losses)", {
  summonerId: z.string().describe("Summoner ID"),
  region: z.string().optional().describe("Region"),
});

server.tool("tft_get_player_profile", "Get complete TFT player profile in one call", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
});

server.tool("tft_get_match_history", "Get recent TFT match history", {
  puuid: z.string().describe("Player PUUID"),
  count: z.number().optional().describe("Number of matches to retrieve"),
});

server.tool("tft_get_match_details", "Get detailed TFT match info (comps, augments, items, traits)", {
  matchId: z.string().describe("Match ID"),
});

server.tool("tft_get_live_game", "Check if a player is currently in a TFT match", {
  puuid: z.string().describe("Player PUUID"),
  region: z.string().optional().describe("Region"),
});

server.tool("tft_analyze_performance", "Analyze recent TFT performance with AI recommendations", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
  matchCount: z.number().optional().describe("Number of matches to analyze"),
});

server.tool("tft_analyze_composition", "Analyze TFT compositions - trait synergies, unit choices, item builds, augments", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
});

server.tool("tft_get_improvement_tips", "Get personalized TFT improvement tips", {
  gameName: z.string().describe("Player name"),
  tagLine: z.string().describe("Tag line"),
  region: z.string().optional().describe("Region"),
});

server.tool("tft_compare_players", "Compare TFT stats between two players", {
  gameName1: z.string().describe("First player name"),
  tagLine1: z.string().describe("First player tag"),
  gameName2: z.string().describe("Second player name"),
  tagLine2: z.string().describe("Second player tag"),
  region: z.string().optional().describe("Region"),
});
