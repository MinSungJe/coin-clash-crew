import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GameTimer from '@/components/GameTimer';
import CryptoChart from '@/components/CryptoChart';
import TradingPanel from '@/components/TradingPanel';
import Portfolio from '@/components/Portfolio';
import GameResults from '@/components/GameResults';
import { TrendingUp, Users, Trophy, Coffee, Clock } from 'lucide-react';

export interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  chartData: { time: number; price: number }[];
}

export interface Trade {
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  timestamp: number;
}

export interface Portfolio {
  cash: number;
  holdings: { [key: string]: number };
  trades: Trade[];
}

const Index = () => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [selectedDuration, setSelectedDuration] = useState(120); // Default 2 minutes
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000,
    holdings: { BTC: 0, ETH: 0, DOGE: 0 },
    trades: []
  });

  const [coins, setCoins] = useState<CoinData[]>([
    {
      symbol: 'BTC',
      name: '비트코인',
      price: 45000000,
      change: 0,
      chartData: []
    },
    {
      symbol: 'ETH',
      name: '이더리움',
      price: 3200000,
      change: 0,
      chartData: []
    },
    {
      symbol: 'DOGE',
      name: '도지코인',
      price: 150,
      change: 0,
      chartData: []
    }
  ]);

  // Mock real-time price updates
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
          const newPrice = coin.price * (1 + changePercent);
          const newDataPoint = {
            time: Date.now(),
            price: newPrice
          };
          
          return {
            ...coin,
            price: newPrice,
            change: changePercent * 100,
            chartData: [...coin.chartData.slice(-19), newDataPoint] // Keep last 20 points
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(selectedDuration);
    // Initialize chart data
    const now = Date.now();
    setCoins(prevCoins =>
      prevCoins.map(coin => ({
        ...coin,
        chartData: [{ time: now, price: coin.price }]
      }))
    );
  };

  const resetGame = () => {
    setGameState('waiting');
    setTimeLeft(selectedDuration);
    setPortfolio({
      cash: 10000,
      holdings: { BTC: 0, ETH: 0, DOGE: 0 },
      trades: []
    });
    setCoins(prevCoins =>
      prevCoins.map(coin => ({
        ...coin,
        change: 0,
        chartData: []
      }))
    );
  };

  const calculateTotalValue = () => {
    const holdingsValue = Object.entries(portfolio.holdings).reduce((total, [symbol, amount]) => {
      const coin = coins.find(c => c.symbol === symbol);
      return total + (coin ? coin.price * amount : 0);
    }, 0);
    return portfolio.cash + holdingsValue;
  };

  const profitLoss = calculateTotalValue() - 10000;
  const profitLossPercent = (profitLoss / 10000) * 100;
  
  const currentPrices = coins.reduce((acc, coin) => {
    acc[coin.symbol] = coin.price;
    return acc;
  }, {} as { [key: string]: number });

  const timeOptions = [
    { value: 60, label: '1분', description: '빠른 승부' },
    { value: 120, label: '2분', description: '기본 모드' },
    { value: 180, label: '3분', description: '여유있게' },
    { value: 300, label: '5분', description: '심화 모드' }
  ];

  if (gameState === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg border-white/20">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">코인 배틀</h1>
              <p className="text-blue-200">친구들과 투자 승부!</p>
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-white">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">게임 시간 선택</span>
              </div>
              
              <RadioGroup 
                value={selectedDuration.toString()} 
                onValueChange={(value) => setSelectedDuration(parseInt(value))}
                className="grid grid-cols-2 gap-3"
              >
                {timeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={option.value.toString()}
                      className="border-white/40 text-white data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label 
                      htmlFor={option.value.toString()} 
                      className="text-sm text-blue-100 cursor-pointer flex flex-col"
                    >
                      <span className="font-medium text-white">{option.label}</span>
                      <span className="text-xs text-blue-300">{option.description}</span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4 text-left text-sm text-blue-100">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>초기 자본: 10,000원</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4" />
                <span>최고 수익률 승리</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="w-4 h-4" />
                <span>꼴등은 커피 쏘기!</span>
              </div>
            </div>

            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
            >
              {timeOptions.find(opt => opt.value === selectedDuration)?.label} 게임 시작하기
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <GameResults 
        finalValue={calculateTotalValue()}
        profitLoss={profitLoss}
        profitLossPercent={profitLossPercent}
        trades={portfolio.trades}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            코인 배틀
          </h1>
          <GameTimer timeLeft={timeLeft} />
        </div>

        {/* Portfolio Overview */}
        <Portfolio 
          portfolio={portfolio}
          totalValue={calculateTotalValue()}
          profitLoss={profitLoss}
          profitLossPercent={profitLossPercent}
          currentPrices={currentPrices}
        />

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <CryptoChart 
              coins={coins}
              selectedCoin={selectedCoin}
              onCoinSelect={setSelectedCoin}
            />
          </div>

          {/* Trading Panel */}
          <div>
            <TradingPanel 
              selectedCoin={coins.find(c => c.symbol === selectedCoin)!}
              portfolio={portfolio}
              onTrade={(trade) => {
                setPortfolio(prev => {
                  const coin = coins.find(c => c.symbol === trade.symbol)!;
                  const tradeValue = trade.amount * coin.price;
                  
                  if (trade.type === 'buy') {
                    if (prev.cash < tradeValue) return prev; // Not enough cash
                    
                    return {
                      ...prev,
                      cash: prev.cash - tradeValue,
                      holdings: {
                        ...prev.holdings,
                        [trade.symbol]: prev.holdings[trade.symbol] + trade.amount
                      },
                      trades: [...prev.trades, { ...trade, price: coin.price, timestamp: Date.now() }]
                    };
                  } else {
                    if (prev.holdings[trade.symbol] < trade.amount) return prev; // Not enough holdings
                    
                    return {
                      ...prev,
                      cash: prev.cash + tradeValue,
                      holdings: {
                        ...prev.holdings,
                        [trade.symbol]: prev.holdings[trade.symbol] - trade.amount
                      },
                      trades: [...prev.trades, { ...trade, price: coin.price, timestamp: Date.now() }]
                    };
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
