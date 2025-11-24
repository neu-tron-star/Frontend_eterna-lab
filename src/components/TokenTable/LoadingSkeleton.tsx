import { memo } from 'react';
import { Card } from '@/components/ui/card';

const LoadingSkeleton = memo(() => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-3 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
