import { Settings, Star, TrendingUp, Grid3x3, Volume2, Target, LayoutGrid, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PulseHeader() {
  return (
    <div className="border-b border-border bg-background px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Pulse</h1>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <div className="flex flex-col gap-0.5">
              <div className="w-4 h-0.5 bg-primary" />
              <div className="w-4 h-0.5 bg-primary" />
              <div className="w-4 h-0.5 bg-primary" />
            </div>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Grid3x3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="h-8 text-xs">
            <LayoutGrid className="w-4 h-4 mr-1" />
            Display
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
            <Target className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="h-8 text-xs border border-border">
            <TrendingUp className="w-4 h-4 mr-1" />
            1
            <div className="flex flex-col gap-0.5 ml-1">
              <div className="w-2 h-0.5 bg-primary" />
              <div className="w-2 h-0.5 bg-primary" />
              <div className="w-2 h-0.5 bg-primary" />
            </div>
            0
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
