import { Zap, LayoutGrid, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColumnHeaderProps {
  title: string;
}

export default function ColumnHeader({ title }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-card border-b border-border">
      <h3 className="text-sm font-medium">{title}</h3>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
          <Zap className="w-3 h-3 mr-1" />
          0
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
          <LayoutGrid className="w-3 h-3" />
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary">
          P1
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
          P2
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
          P3
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
          <Settings className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
