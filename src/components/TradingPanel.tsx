
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { CoinData, Portfolio, Trade } from '@/pages/Index';
import { ShoppingCart, DollarSign } from 'lucide-react';

interface TradingPanelProps {
  selectedCoin: CoinData;
  portfolio: Portfolio;
  onTrade: (trade: Omit<Trade, 'price' | 'timestamp'>) => void;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ selectedCoin, portfolio, onTrade }) => {
  const [tradeAmount, setTradeAmount] = useState<number>(0);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const maxBuyAmount = Math.floor(portfolio.cash / selectedCoin.price * 100) / 100; // 소수점 2자리
  const maxSellAmount = portfolio.holdings[selectedCoin.symbol] || 0;
  
  const maxAmount = tradeType === 'buy' ? maxBuyAmount : maxSellAmount;
  const tradeValue = tradeAmount * selectedCoin.price;

  const handleSliderChange = (value: number[]) => {
    const percentage = value[0];
    const amount = (maxAmount * percentage) / 100;
    setTradeAmount(Math.floor(amount * 100) / 100);
  };

  const handleTrade = () => {
    if (tradeAmount <= 0 || tradeAmount > maxAmount) return;
    
    onTrade({
      type: tradeType,
      symbol: selectedCoin.symbol,
      amount: tradeAmount
    });
    
    setTradeAmount(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      <div className="space-y-6">
        {/* Trade Type Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={() => setTradeType('buy')}
            className={`flex-1 ${
              tradeType === 'buy'
                ? 'bg-green-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            매수
          </Button>
          <Button
            onClick={() => setTradeType('sell')}
            className={`flex-1 ${
              tradeType === 'sell'
                ? 'bg-red-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            매도
          </Button>
        </div>

        {/* Current Holdings */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">보유 현금</span>
            <span className="text-white font-mono">₩{formatPrice(portfolio.cash)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">{selectedCoin.name} 보유량</span>
            <span className="text-white font-mono">{maxSellAmount.toFixed(4)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-white text-sm">거래 수량</label>
          <Input
            type="number"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            placeholder="0.00"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            step="0.01"
            max={maxAmount}
          />
          
          {/* Percentage Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/70">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <Slider
              value={[maxAmount > 0 ? (tradeAmount / maxAmount) * 100 : 0]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2">
            {[25, 50, 75, 100].map(percent => (
              <Button
                key={percent}
                onClick={() => setTradeAmount(Math.floor((maxAmount * percent / 100) * 100) / 100)}
                variant="outline"
                size="sm"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                {percent}%
              </Button>
            ))}
          </div>
        </div>

        {/* Trade Summary */}
        <div className="space-y-2 p-4 bg-white/5 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">거래 금액</span>
            <span className="text-white font-mono">₩{formatPrice(tradeValue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">현재 가격</span>
            <span className="text-white font-mono">₩{formatPrice(selectedCoin.price)}</span>
          </div>
        </div>

        {/* Trade Button */}
        <Button
          onClick={handleTrade}
          disabled={tradeAmount <= 0 || tradeAmount > maxAmount}
          className={`w-full py-3 text-lg font-semibold ${
            tradeType === 'buy'
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {tradeType === 'buy' ? '매수하기' : '매도하기'}
        </Button>

        {/* Insufficient Funds Warning */}
        {tradeAmount > maxAmount && (
          <p className="text-red-400 text-sm text-center">
            {tradeType === 'buy' ? '보유 현금이 부족합니다' : '보유량이 부족합니다'}
          </p>
        )}
      </div>
    </Card>
  );
};

export default TradingPanel;
