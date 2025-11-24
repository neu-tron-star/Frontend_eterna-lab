import { Token } from '@/store/slices/tokensSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import PriceCell from './PriceCell';
import { Users, Droplets, BarChart3, TrendingUp, Clock } from 'lucide-react';

interface TokenModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TokenModal({ token, open, onOpenChange }: TokenModalProps) {
  if (!token) return null;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New Pairs';
      case 'final-stretch': return 'Final Stretch';
      case 'migrated': return 'Migrated';
      default: return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <DialogTitle className="text-2xl">{token.symbol}</DialogTitle>
              <DialogDescription>{token.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Price Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Price</h3>
            <PriceCell 
              price={token.price} 
              change={token.priceChange24h}
              lastUpdate={token.lastUpdate}
            />
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">24h Volume</span>
              </div>
              <div className="text-xl font-semibold">{formatNumber(token.volume24h)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Market Cap</span>
              </div>
              <div className="text-xl font-semibold">{formatNumber(token.marketCap)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="w-4 h-4" />
                <span className="text-sm">Liquidity</span>
              </div>
              <div className="text-xl font-semibold">{formatNumber(token.liquidity)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Holders</span>
              </div>
              <div className="text-xl font-semibold">{token.holders.toLocaleString()}</div>
            </div>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">{getStatusLabel(token.status)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {formatDate(token.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update</span>
              <span className="font-medium">{formatDate(token.lastUpdate)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
