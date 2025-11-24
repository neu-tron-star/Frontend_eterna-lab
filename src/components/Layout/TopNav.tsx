import { Search, Star, Bell, Wallet, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopNav() {
  const navItems = [
    'Discover',
    'Pulse',
    'Trackers',
    'Perpetuals',
    'Yield',
    'Vision',
    'Portfolio',
    'Rewards',
  ];

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo + Nav Items */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <div className="w-5 h-5 bg-foreground" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item}
                variant={item === 'Pulse' ? 'default' : 'ghost'}
                size="sm"
                className={item === 'Pulse' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <span className="text-xs">≡ SOL</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>

          <Button size="sm" className="bg-primary text-primary-foreground">
            Deposit
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Star className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground border border-border">
            <Wallet className="w-4 h-4 mr-1" />
            <span className="text-xs">0</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <span className="text-success mr-1">●</span>
            <span className="text-xs">0</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
