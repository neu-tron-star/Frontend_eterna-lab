import { memo } from 'react';
import { Token } from '@/store/slices/tokensSlice';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PriceCell from './PriceCell';
import { Users, Droplets, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

const TokenCard = memo(({ token, onClick }: TokenCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <TooltipProvider>
      <Card 
        className={cn(
          "p-4 transition-all duration-200 cursor-pointer",
          "hover:bg-card/80 hover:shadow-lg hover:border-primary/50",
          "group"
        )}
        onClick={() => onClick(token)}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Token Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
              {token.symbol.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                {token.symbol}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {token.name}
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="shrink-0">
            <PriceCell 
              price={token.price} 
              change={token.priceChange24h}
              lastUpdate={token.lastUpdate}
            />
          </div>

          {/* Stats */}
          <div className="hidden lg:flex gap-6 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(token.volume24h)}</div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>24h Trading Volume</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-muted-foreground" />
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(token.liquidity)}</div>
                    <div className="text-xs text-muted-foreground">Liquidity</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total Liquidity</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="text-right">
                    <div className="text-sm font-medium">{token.holders.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Holders</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of Token Holders</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
});

TokenCard.displayName = 'TokenCard';

export default TokenCard;
