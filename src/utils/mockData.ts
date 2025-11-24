import { Token, TokenStatus } from '@/store/slices/tokensSlice';

const tokenNames = [
  { symbol: 'PEPE', name: 'Pepe' },
  { symbol: 'SHIB', name: 'Shiba Inu' },
  { symbol: 'DOGE', name: 'Dogecoin' },
  { symbol: 'BONK', name: 'Bonk' },
  { symbol: 'WIF', name: 'dogwifhat' },
  { symbol: 'FLOKI', name: 'Floki Inu' },
  { symbol: 'MEME', name: 'Memecoin' },
  { symbol: 'WOJAK', name: 'Wojak' },
  { symbol: 'TURBO', name: 'Turbo' },
  { symbol: 'LADYS', name: 'Milady' },
  { symbol: 'BITE', name: 'DragonBite' },
  { symbol: 'TSUKA', name: 'Dejitaru Tsuka' },
  { symbol: 'HIGHER', name: 'Higher' },
  { symbol: 'MONG', name: 'MongCoin' },
  { symbol: 'FOUR', name: 'The 4th Pillar' },
];

function generateToken(index: number, status: TokenStatus): Token {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const basePrice = Math.random() * 0.01;
  const priceChange = (Math.random() - 0.5) * 50; // -25% to +25%
  
  return {
    id: `token-${status}-${index}`,
    symbol: `${tokenInfo.symbol}${index}`,
    name: `${tokenInfo.name} ${index}`,
    price: parseFloat(basePrice.toFixed(6)),
    priceChange24h: parseFloat(priceChange.toFixed(2)),
    volume24h: Math.floor(Math.random() * 10000000) + 100000,
    marketCap: Math.floor(Math.random() * 50000000) + 500000,
    liquidity: Math.floor(Math.random() * 5000000) + 50000,
    holders: Math.floor(Math.random() * 10000) + 100,
    status,
    createdAt: Date.now() - Math.floor(Math.random() * 86400000),
    lastUpdate: Date.now(),
  };
}

export function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  
  // Generate 15 new pairs
  for (let i = 0; i < 15; i++) {
    tokens.push(generateToken(i, 'new'));
  }
  
  // Generate 15 final stretch
  for (let i = 0; i < 15; i++) {
    tokens.push(generateToken(i, 'final-stretch'));
  }
  
  // Generate 15 migrated
  for (let i = 0; i < 15; i++) {
    tokens.push(generateToken(i, 'migrated'));
  }
  
  return tokens;
}
