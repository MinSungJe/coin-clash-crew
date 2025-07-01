import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CoinData } from '@/types/GameTypes';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoChartProps {
  coins: CoinData[];
  selectedCoin: string;
  onCoinSelect: (symbol: string) => void;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ coins, selectedCoin, onCoinSelect }) => {
  const selectedCoinData = coins.find(c => c.symbol === selectedCoin)!;
  
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}K`;
    }
    return price.toFixed(0);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', { 
      hour12: false, 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      {/* Coin Selection Tabs */}
      <div className="flex gap-2 mb-6">
        {coins.map(coin => (
          <Button
            key={coin.symbol}
            onClick={() => onCoinSelect(coin.symbol)}
            variant={selectedCoin === coin.symbol ? "default" : "outline"}
            className={`flex-1 ${
              selectedCoin === coin.symbol 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <div className="text-center">
              <div className="font-bold">{coin.symbol}</div>
              <div className="text-xs opacity-80">{coin.name}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Price Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              ₩{formatPrice(selectedCoinData.price)}
            </h2>
            <div className={`flex items-center gap-1 text-sm ${
              selectedCoinData.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {selectedCoinData.change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {selectedCoinData.change >= 0 ? '+' : ''}
                {selectedCoinData.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        {selectedCoinData.chartData.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedCoinData.chartData}>
              <XAxis 
                dataKey="time" 
                tickFormatter={formatTime}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatPrice}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip 
                labelFormatter={(time) => formatTime(time as number)}
                formatter={(value) => [`₩${formatPrice(value as number)}`, '가격']}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={selectedCoinData.change >= 0 ? '#22c55e' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: selectedCoinData.change >= 0 ? '#22c55e' : '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-white/60">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>실시간 차트 로딩 중...</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CryptoChart;
