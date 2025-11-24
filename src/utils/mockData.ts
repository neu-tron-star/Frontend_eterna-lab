import { Token, TokenStatus } from '@/store/slices/tokensSlice';

const tokenNames = [
  { symbol: 'EDP', name: 'Every Day Problems', image: '👨‍💼' },
  { symbol: 'Spongebob', name: 'SpongeBob SquarePants', image: '🧽' },
  { symbol: 'MONSHIT', name: 'MONSHIT', image: '💎' },
  { symbol: 'Skirliton', name: 'Skirliton', image: '💀' },
  { symbol: 'McMonad', name: 'Mc Monad', image: '🍔' },
  { symbol: 'Google', name: 'Google', image: '🔍' },
  { symbol: 'BRIDGLESS', name: 'Bridgless Coin', image: '🅱️' },
  { symbol: 'CHIIKAWA', name: 'ちいかわ アニメ火金', image: '🐰' },
  { symbol: '7ev', name: '@7evenbot', image: '🎮' },
  { symbol: 'WeChat', name: 'Chinese App', image: '💬' },
  { symbol: 'Tesla', name: 'Tesla', image: '🚗' },
];

const generateAddress = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

function generateToken(index: number, status: TokenStatus): Token {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const basePrice = Math.random() * 200 + 10;
  const priceChange = (Math.random() - 0.5) * 200;
  const timeValue = Math.floor(Math.random() * 60) + 1;
  const timeUnits = ['s', 'm', 'h'];
  const timeUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
  
  return {
    id: `token-${status}-${index}`,
    symbol: tokenInfo.symbol,
    name: tokenInfo.name,
    image: tokenInfo.image,
    price: parseFloat(basePrice.toFixed(2)),
    priceChange24h: parseFloat(priceChange.toFixed(2)),
    volume24h: Math.floor(Math.random() * 50000) + 1000,
    marketCap: Math.floor(Math.random() * 20000000) + 100000,
    liquidity: Math.floor(Math.random() * 5000000) + 10000,
    holders: Math.floor(Math.random() * 300) + 1,
    status,
    createdAt: Date.now() - Math.floor(Math.random() * 86400000),
    lastUpdate: Date.now(),
    timeAgo: `${timeValue}${timeUnit}`,
    likes: Math.floor(Math.random() * 10),
    dislikes: Math.floor(Math.random() * 5),
    comments: Math.floor(Math.random() * 100),
    flags: Math.floor(Math.random() * 100),
    txCount: Math.floor(Math.random() * 500) + 1,
    feeRatio: parseFloat((Math.random() * 0.5).toFixed(2)),
    change1h: parseFloat(((Math.random() - 0.5) * 200).toFixed(2)),
    change5m: parseFloat(((Math.random() - 0.5) * 100).toFixed(2)),
    change1m: parseFloat(((Math.random() - 0.5) * 50).toFixed(2)),
    liquidityChange: parseFloat(((Math.random() - 0.5) * 100).toFixed(2)),
    volumeChange: parseFloat(((Math.random() - 0.5) * 100).toFixed(2)),
    address: `${generateAddress()}...${generateAddress().slice(0, 4)}`,
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
