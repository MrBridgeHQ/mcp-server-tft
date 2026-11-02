# Teamfight Tactics MCP Server - AI Game Analysis

**TFT data & AI-powered coaching for Claude Desktop, Claude Code & MCP-compatible AI assistants.**

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-00C7B7?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/mrbridge/tft-mcp-server)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-5A67D8?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-10-blue?style=flat-square)](#available-tools)
[![Rating](https://img.shields.io/badge/Rating-5.0%2F5-gold?style=flat-square)](https://apify.com/mrbridge/tft-mcp-server)

## What does it do?

Teamfight Tactics MCP Server connects AI assistants to TFT data via the Riot Games API. **10 tools** for player profiles, ranked stats, match history, composition analysis, augment optimization, live game detection - plus **AI-powered performance coaching**.

TFT is a game of decision-making under pressure. This server lets AI do the heavy lifting: it reads your match history, analyzes your comps, and gives you **actionable coaching advice** tailored to your rank and playstyle.

## Available Tools

| Tool | Description |
|------|-------------|
| `tft_get_account` | Get account info by Riot ID |
| `tft_get_ranked` | Get ranked stats (tier, rank, LP, wins/losses) |
| `tft_get_player_profile` | Get complete player profile in one call |
| `tft_get_match_history` | Get recent match history |
| `tft_get_match_details` | Get detailed match info (comps, augments, items) |
| `tft_get_live_game` | Check if a player is currently in a TFT match |
| `tft_analyze_performance` | Analyze recent performance with recommendations |
| `tft_analyze_composition` | Analyze trait synergies, unit choices & item builds |
| `tft_get_improvement_tips` | Get personalized improvement tips |
| `tft_compare_players` | Compare TFT stats between two players |

## Key Features

- **Composition Analysis**: AI examines trait synergies, unit choices, item builds, augment selections
- **Augment Optimization**: Track which augments you win with and which cost you LP
- **Data Dragon Integration**: Unit, trait, item, and augment names automatically resolved
- **Intelligent Caching**: Smart TTL-based caching to reduce API calls
- **16 Regions**: EUW, NA, KR, BR, LA, OC, TR, RU, JP, PH, SG, TH, TW, VN, and more

## Quick Start

1. Get your [Apify API Token](https://console.apify.com/settings/integrations)
2. Add a custom MCP connector:

```
https://mrbridge--tft-mcp-server.apify.actor/mcp?token=YOUR_APIFY_TOKEN
```

3. Ask Claude: *"Analyze my last 10 TFT games, I'm YourName#EUW"*

## Pricing

Pay-per-event on Apify. $5 free credits/month included.

## Links

- **Apify Store**: [TFT MCP Server](https://apify.com/mrbridge/tft-mcp-server)
- **Full documentation**: See the Apify Store page for detailed README, output examples, and troubleshooting

## License

MIT
