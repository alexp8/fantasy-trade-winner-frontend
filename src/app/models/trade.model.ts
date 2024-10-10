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
  }
  
  export interface DraftPick {
    round: number;
    range: string;
    season: string;
    value_when_traded: number;
    latest_value: number;
    value_now_as_of: string | null;
  }
  
  export interface TradeRoster {
    total_current_value: number;
    total_value_when_traded: number;
    user_name: string;
    avatar_url: string;
    user_id: string;
    roster_id: number;
    fab: number;
    players: Player[];
    draft_picks: DraftPick[];
  }
  
  export interface Trade {
    [rosterId: number]: TradeRoster;
    created_at_millis: number;
    created_at_formatted: string;
    transaction_id: string;
    roster_ids: number[];
    week: number;
  }
  
  export interface TradeResponse {
    page: number;
    total_pages: number;
    total_trades: number;
    has_next: boolean;
    has_previous: boolean;
    previous_league_ids: PreviousLeague[];
    trades: Trade[];
  }
  