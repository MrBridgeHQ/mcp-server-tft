# Teamfight Tactics MCP Server

**Teamfight Tactics data and placement coaching for Claude Desktop, ChatGPT and other MCP-compatible AI assistants.**

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-00C7B7?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/mrbridge/tft-mcp-server?fpr=mrbridge)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-5A67D8?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-19-blue?style=flat-square)](#available-tools)

## What does it do?

This server connects an AI assistant to Teamfight Tactics (TFT) data. It exposes **19 tools** for player profiles, ranked standings across Ranked TFT, Hyper Roll and Double Up, match history, full match lobbies, live game lookup, ladders and platform status. Four of them analyze recent games and return coaching output: placement performance, a single unit, improvement tips and a two-player comparison.

No Riot API key is needed on your side. You connect with an Apify API token.

This repository holds the tool declarations only. The server itself runs on Apify in Standby mode, and the connection URL below points to it.

## Available Tools

### Player & matches
| Tool | Description |
|------|-------------|
| `tft_get_account` | Resolve a Riot ID (gameName#tagLine) to a player and its PUUID |
| `tft_get_player_profile` | Complete profile: account, level, ranked (TFT, Hyper Roll, Double Up) |
| `tft_get_summoner` | Summoner level and profile icon |
| `tft_get_ranked` | Ranked standings across TFT, Hyper Roll and Double Up |
| `tft_get_match_history` | Recent match IDs, with pagination and a time range |
| `tft_get_match_details` | Full 8-player lobby: placement, traits, starred units, items, augments, Little Legend |
| `tft_get_live_game` | Check whether a player is in a live TFT game |

### Analysis & coaching
| Tool | Description |
|------|-------------|
| `tft_analyze_performance` | Placement diagnosis: average placement, top-4 and top-1 rates, units and traits |
| `tft_analyze_champion` | How a specific unit performs for a player: placement, top-4 rate, common items |
| `tft_get_improvement_tips` | Personalized tips with current vs target placement values |
| `tft_compare_players` | Compare two players side by side |

### Ladders & platform
| Tool | Description |
|------|-------------|
| `tft_get_league_top` | Apex ladders: Challenger, Grandmaster, Master |
| `tft_get_league_entries` | Any tier and division ladder page (for example Diamond I) |
| `tft_get_rated_ladder` | Hyper Roll rated ladder |
| `tft_get_league_by_id` | A full league by its ID |
| `tft_get_status` | TFT platform status: maintenances and incidents |
| `tft_get_featured_games` | Returns a notice only, because featured games are no longer available |

`tft_get_match_timeline` and `tft_get_champion_mastery` are declared for compatibility. They answer that the feature is not available for Teamfight Tactics.

## Regions

14 TFT regions, from `euw1` (Europe West) and `na1` to `kr`. Analysis tools answer in English or French.

## Quick Start

1. Create an Apify account if you do not have one: [sign up](https://console.apify.com/sign-up?fpr=mrbridge).
2. Get your [Apify API token](https://console.apify.com/settings/integrations).
3. Add a custom MCP connector in your client with this URL, using Streamable HTTP:

```
https://mrbridge--tft-mcp-server.apify.actor/mcp?token=YOUR_APIFY_TOKEN
```

4. Ask your assistant: *"Analyze my last 10 TFT games, my Riot ID is YourName#EUW"*

## Pricing

Pay-per-event on Apify. See the [Pricing tab](https://apify.com/mrbridge/tft-mcp-server/pricing?fpr=mrbridge) of the Store page for the current rates.

## Links

- **Apify Store**: [TFT MCP Server](https://apify.com/mrbridge/tft-mcp-server?fpr=mrbridge)
- **Full documentation**: the Apify Store page has the complete README, output examples and troubleshooting
- **League of Legends**: [LoL MCP Server](https://apify.com/mrbridge/lol-mcp-server?fpr=mrbridge)

## Built by MrBridge

See the [TFT MCP server details](https://mr-bridge.com/solutions/tft-mcp-server) page or the [MrBridge MCP server catalog](https://mr-bridge.com/mcp-servers). New to the protocol? Read [what MCP is and why it matters](https://mr-bridge.com/articles/what-is-mcp-model-context-protocol). More about what we do at [mr-bridge.com](https://mr-bridge.com).

## License

MIT

TFT MCP Server is not endorsed by and is not affiliated with Riot Games. Teamfight Tactics is a trademark of Riot Games, Inc.
