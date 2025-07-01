import React from 'react';
import { Card } from '@/components/ui/card';
import { Portfolio as PortfolioType, Trade } from '@/types/GameTypes';
import { Wallet, TrendingUp, TrendingDown, PieChart, Coins } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioType;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
  currentPrices: { [key: string]: number };
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  portfolio, 
  totalValue, 
  profitLoss, 
  profitLossPercent,
  currentPrices
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1) {
      return amount.toFixed(2);
    }
    return amount.toFixed(5);
  };

  const calculateAveragePrice = (symbol: string): number => {
    const buyTrades = portfolio.trades.filter(trade => trade.symbol === symbol && trade.type === 'buy');
    if (buyTrades.length === 0) return 0;
    
    const totalAmount = buyTrades.reduce((sum, trade) => sum + trade.amount, 0);
    const totalCost = buyTrades.reduce((sum, trade) => sum + (trade.amount * trade.price), 0);
    
    return totalCost / totalAmount;
  };

  const isProfit = profitLoss >= 0;

  const holdings = Object.entries(portfolio.holdings).filter(([_, amount]) => amount > 0);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Value */}
        <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">총 자산</p>
              <p className="text-white text-xl font-bold">₩{formatPrice(totalValue)}</p>
            </div>
          </div>
        </Card>

        {/* Cash */}
        <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">보유 현금</p>
              <p className="text-white text-xl font-bold">₩{formatPrice(portfolio.cash)}</p>
            </div>
          </div>
        </Card>

        {/* Profit/Loss */}
        <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isProfit 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            }`}>
              {isProfit ? (
                <TrendingUp className="w-5 h-5 text-white" />
              ) : (
                <TrendingDown className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-white/70 text-sm">손익</p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}₩{formatPrice(profitLoss)}
              </p>
            </div>
          </div>
        </Card>

        {/* Profit/Loss Percentage */}
        <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isProfit 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            }`}>
              <span className="text-white font-bold text-sm">%</span>
            </div>
            <div>
              <p className="text-white/70 text-sm">수익률</p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Holdings Detail */}
      {holdings.length > 0 && (
        <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">보유 종목</h3>
          </div>
          <div className="space-y-3">
            {holdings.map(([symbol, amount]) => {
              const currentPrice = currentPrices[symbol] || 0;
              const averagePrice = calculateAveragePrice(symbol);
              const profitLossAmount = (currentPrice - averagePrice) * amount;
              const profitLossPercent = averagePrice > 0 ? ((currentPrice - averagePrice) / averagePrice) * 100 : 0;
              const isHoldingProfit = profitLossAmount >= 0;

              return (
                <div key={symbol} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{symbol}</span>
                      <span className="text-white font-mono">{formatAmount(amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">평균 매수가: ₩{formatPrice(averagePrice)}</span>
                      <span className="text-white/70">현재가: ₩{formatPrice(currentPrice)}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-sm font-semibold ${isHoldingProfit ? 'text-green-400' : 'text-red-400'}`}>
                      {isHoldingProfit ? '+' : ''}₩{formatPrice(profitLossAmount)}
                    </div>
                    <div className={`text-xs ${isHoldingProfit ? 'text-green-400' : 'text-red-400'}`}>
                      {isHoldingProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Portfolio;
