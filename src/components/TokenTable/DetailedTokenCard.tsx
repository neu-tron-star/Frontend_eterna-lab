import { memo } from 'react';
import { Token } from '@/store/slices/tokensSlice';
import { Edit, Link2, Search, ThumbsUp, ThumbsDown, Flag, Users, Globe, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailedTokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

const DetailedTokenCard = memo(({ token, onClick }: DetailedTokenCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number) => {
    const abs = Math.abs(num);
    return `${abs.toFixed(0)}%`;
  };

  const getPercentColor = (num: number) => {
    if (num > 0) return 'text-success';
    if (num < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getPercentBg = (num: number) => {
    if (num > 0) return 'bg-success/10';
    if (num < 0) return 'bg-destructive/10';
    return 'bg-muted/10';
  };

  return (
    <div 
      className="bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
      onClick={() => onClick(token)}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 p-3">
        {/* Token Image */}
        <div className="w-16 h-16 rounded border-2 border-primary/50 flex items-center justify-center text-2xl shrink-0 bg-background relative">
          {token.image}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-card" />
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">{token.symbol}</span>
            <span className="text-xs text-muted-foreground truncate">{token.name}</span>
            <button className="w-3 h-3 rounded-sm bg-muted/50 flex items-center justify-center">
              <span className="text-[8px]">📋</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{token.timeAgo}</span>
            <button className="text-muted-foreground hover:text-primary"><Edit className="w-3 h-3" /></button>
            <button className="text-muted-foreground hover:text-primary"><Link2 className="w-3 h-3" /></button>
            <button className="text-muted-foreground hover:text-primary"><Search className="w-3 h-3" /></button>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{token.holders}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="text-muted-foreground hover:text-success">
                <ThumbsUp className="w-3 h-3" />
              </button>
              <span className="text-muted-foreground">{token.likes}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="text-muted-foreground hover:text-destructive">
                <ThumbsDown className="w-3 h-3" />
              </button>
              <span className="text-muted-foreground">{token.dislikes}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Flag className="w-3 h-3" />
              <span>{token.flags}</span>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-0.5">
            MC <span className="text-primary font-medium">{formatNumber(token.marketCap)}</span>
          </div>
          <div className="text-sm font-bold mb-0.5">
            <span className={token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}>
              V {formatNumber(token.volume24h)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mb-0.5">
            V ${Math.floor(token.price)}
          </div>
          <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
            <span>F =</span>
            <span>{token.feeRatio}</span>
            <span>TX {token.txCount}</span>
            <div className="w-8 h-1 bg-destructive/20" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-3 px-3 pb-3 text-xs">
        <div className="w-16" /> {/* Spacer for alignment */}
        
        <div className="flex-1 flex items-center gap-3">
          {/* Percentage changes */}
          <div className="flex items-center gap-1">
            {token.priceChange24h < 0 ? (
              <TrendingDown className="w-3 h-3 text-destructive" />
            ) : (
              <TrendingUp className="w-3 h-3 text-success" />
            )}
            <span className={getPercentColor(token.priceChange24h)}>
              {formatPercent(token.priceChange24h)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change5m))}>
            {token.change5m > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change5m < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change5m)}>
              {formatPercent(token.change5m)}
            </span>
            <span className="text-muted-foreground">5m</span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change1m))}>
            {token.change1m > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change1m < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change1m)}>
              {formatPercent(token.change1m)}
            </span>
            <span className="text-muted-foreground">43m</span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change1h))}>
            {token.change1h > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change1h < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change1h)}>
              {formatPercent(token.change1h)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.liquidityChange))}>
            <Globe className="w-3 h-3" />
            <span className={getPercentColor(token.liquidityChange)}>
              {formatPercent(token.liquidityChange)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.volumeChange))}>
            <TrendingUp className="w-3 h-3" />
            <span className={getPercentColor(token.volumeChange)}>
              {formatPercent(token.volumeChange)}
            </span>
          </div>
        </div>
      </div>

      {/* Address Row */}
      <div className="px-3 pb-2">
        <div className="text-[10px] text-muted-foreground font-mono">
          {token.address}
        </div>
      </div>
    </div>
  );
});

DetailedTokenCard.displayName = 'DetailedTokenCard';

export default DetailedTokenCard;
