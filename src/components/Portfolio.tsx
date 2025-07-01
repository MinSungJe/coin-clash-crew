
import React from 'react';
import { Card } from '@/components/ui/card';
import { Portfolio as PortfolioType } from '@/pages/Index';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioType;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  portfolio, 
  totalValue, 
  profitLoss, 
  profitLossPercent 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  const isProfit = profitLoss >= 0;

  return (
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
  );
};

export default Portfolio;
