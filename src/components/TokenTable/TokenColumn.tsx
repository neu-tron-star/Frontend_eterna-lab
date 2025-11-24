import { memo, useMemo, useState } from 'react';
import { Token } from '@/store/slices/tokensSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSortBy } from '@/store/slices/tokensSlice';
import TokenCard from './TokenCard';
import TokenModal from './TokenModal';
import LoadingSkeleton from './LoadingSkeleton';
import SortableHeader from './SortableHeader';
import { Card } from '@/components/ui/card';

interface TokenColumnProps {
  title: string;
  status: 'new' | 'final-stretch' | 'migrated';
}

const TokenColumn = memo(({ title, status }: TokenColumnProps) => {
  const dispatch = useAppDispatch();
  const { tokens, sortBy, sortOrder, isLoading } = useAppSelector(state => state.tokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAndSortedTokens = useMemo(() => {
    const filtered = tokens.filter(t => t.status === status);
    
    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [tokens, status, sortBy, sortOrder]);

  const handleSort = (key: keyof Token) => {
    dispatch(setSortBy(key));
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm border-primary/20">
        <h2 className="text-lg font-bold mb-3 text-primary">{title}</h2>
        <div className="flex gap-2 flex-wrap">
          <SortableHeader
            label="Price"
            sortKey="price"
            currentSortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <SortableHeader
            label="Change"
            sortKey="priceChange24h"
            currentSortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <SortableHeader
            label="Volume"
            sortKey="volume24h"
            currentSortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <SortableHeader
            label="Liquidity"
            sortKey="liquidity"
            currentSortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </div>
      </Card>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          filteredAndSortedTokens.map(token => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={handleTokenClick}
            />
          ))
        )}
      </div>

      <TokenModal
        token={selectedToken}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
});

TokenColumn.displayName = 'TokenColumn';

export default TokenColumn;
