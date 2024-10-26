export interface PreviousLeague {
  previous_league_id: string;
  season: string;
}

export interface Player {
  player_id: string;
  player_name: string;
  value_when_traded: number;
  latest_value: number;
  value_now_as_of: string | null;
  ktc_values: KtcValue[]
}

export interface KtcValue {
  ktc_value: number;
  date: string;
}

export interface DraftPick {
  round: number;
  range: string;
  season: string;
  value_when_traded: number;
  latest_value: number;
  value_now_as_of: string | null;
  description: string;
  player_drafted: Player | null; // todo use this
  draft_slot: number | null; // todo use this
}

export interface TradeRoster {
  total_current_value: number;
  total_value_when_traded: number;
  user_name: string;
  user_id: string;
  roster_id: number;
  fab: number;
  players: Player[];
  draft_picks: DraftPick[];
  won: boolean;
  most_valuable_player: string;
  most_valuable_draft_pick: string;
}

export interface Trade {
  [rosterId: number]: TradeRoster;
  created_at_millis: number;
  created_at_pretty: string;
  created_at_yyyy_mm_dd: string;
  transaction_id: string;
  roster_ids: number[];
  week: number;
}

export interface LeagueUser {
  user_id: string;
  user_name: string;
  roster_avatar: string;
  user_avatar: string;
  roster_id: number;
}

export interface TradeResponse {
  league_avatar: string;
  league_name: String;
  league_season: String;
  page: number;
  total_pages: number;
  total_trades: number;
  has_next: boolean;
  has_previous: boolean;
  previous_leagues: PreviousLeague[];
  league_users: LeagueUser[];
  trades: Trade[];
}
