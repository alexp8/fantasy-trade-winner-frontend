import { LeagueUser, Trade } from "./trade.model";

export interface LeaderboardResponse {
    league_name: string;
    league_id: string;
    league_avatar: string;
    rankings: Ranking[];
    league_users: LeagueUser[];
}

export interface Ranking {
    username: string;
    roster_id: number;
    user_id: string;
    total_net_value: number;
    total_trades: number;
    worst_trade_net: number;
    best_trade_net: number;
    worst_trade: Trade;
    best_trade: Trade;
}