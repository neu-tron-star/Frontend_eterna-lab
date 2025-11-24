import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppDispatch } from '@/store/hooks';
import { setTokens, updateTokenPrice, setLoading } from '@/store/slices/tokensSlice';
import { generateMockTokens } from '@/utils/mockData';
import { mockWebSocket } from '@/services/mockWebSocket';
import TokenColumn from '@/components/TokenTable/TokenColumn';
import { Activity } from 'lucide-react';

function TokenDashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial load with delay to show skeleton
    setTimeout(() => {
      const tokens = generateMockTokens();
      dispatch(setTokens(tokens));
      mockWebSocket.connect(tokens);
    }, 1500);

    // Subscribe to WebSocket updates
    const unsubscribe = mockWebSocket.subscribe((update) => {
      dispatch(updateTokenPrice(update));
    });

    return () => {
      unsubscribe();
      mockWebSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Token Discovery
              </h1>
              <p className="text-sm text-muted-foreground">Real-time token tracking & analytics</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          <TokenColumn title="🚀 New Pairs" status="new" />
          <TokenColumn title="⚡ Final Stretch" status="final-stretch" />
          <TokenColumn title="✅ Migrated" status="migrated" />
        </div>
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <Provider store={store}>
      <TokenDashboard />
    </Provider>
  );
};

export default Index;
