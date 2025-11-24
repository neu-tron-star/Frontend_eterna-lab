import { memo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Token } from '@/store/slices/tokensSlice';
import { cn } from '@/lib/utils';

interface SortableHeaderProps {
  label: string;
  sortKey: keyof Token;
  currentSortBy: keyof Token;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Token) => void;
}

const SortableHeader = memo(({ 
  label, 
  sortKey, 
  currentSortBy, 
  sortOrder, 
  onSort 
}: SortableHeaderProps) => {
  const isActive = currentSortBy === sortKey;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 text-xs font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
      onClick={() => onSort(sortKey)}
    >
      {label}
      {isActive ? (
        sortOrder === 'asc' ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : (
          <ArrowDown className="ml-1 h-3 w-3" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
      )}
    </Button>
  );
});

SortableHeader.displayName = 'SortableHeader';

export default SortableHeader;
