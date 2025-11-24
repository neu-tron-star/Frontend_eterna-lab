import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TokenStatus = 'new' | 'final-stretch' | 'migrated';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  status: TokenStatus;
  createdAt: number;
  lastUpdate: number;
  timeAgo: string;
  likes: number;
  dislikes: number;
  comments: number;
  flags: number;
  txCount: number;
  feeRatio: number;
  change1h: number;
  change5m: number;
  change1m: number;
  liquidityChange: number;
  volumeChange: number;
  address: string;
}

interface TokensState {
  tokens: Token[];
  sortBy: keyof Token;
  sortOrder: 'asc' | 'desc';
  isLoading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  sortBy: 'volume24h',
  sortOrder: 'desc',
  isLoading: true,
  error: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.isLoading = false;
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id);
      if (token) {
        token.price = action.payload.price;
        token.priceChange24h = action.payload.priceChange24h;
        token.lastUpdate = Date.now();
      }
    },
    setSortBy: (state, action: PayloadAction<keyof Token>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortOrder = 'desc';
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTokens, updateTokenPrice, setSortBy, setLoading, setError } = tokensSlice.actions;
export default tokensSlice.reducer;
