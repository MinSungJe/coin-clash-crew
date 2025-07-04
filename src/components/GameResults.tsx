import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trade } from '@/types/GameTypes';
import { Trophy, Coffee, TrendingUp, TrendingDown, RotateCcw, Target, Flag } from 'lucide-react';
import { useGameHistory } from '@/hooks/useGameHistory';

interface GameResultsProps {
  finalValue: number;
  profitLoss: number;
  profitLossPercent: number;
  trades: Trade[];
  onRestart: () => void;
  isGaveUp: boolean;
  selectedDuration: number;
  selectedCapital: number;
}

const GameResults: React.FC<GameResultsProps> = ({
  finalValue,
  profitLoss,
  profitLossPercent,
  trades,
  onRestart,
  isGaveUp,
  selectedDuration,
  selectedCapital
}) => {
  const { saveGameRecord } = useGameHistory();
  const savedRef = useRef(false);

  // Save game record only once when component mounts
  React.useEffect(() => {
    if (!savedRef.current) {
      console.log('Saving game record...');
      saveGameRecord({
        timestamp: Date.now(),
        duration: selectedDuration,
        initialCapital: selectedCapital,
        finalValue,
        profitLoss,
        profitLossPercent,
        trades,
        isGaveUp,
        gameEndTime: Date.now()
      });
      savedRef.current = true;
    }
  }, []); // 빈 의존성 배열로 한 번만 실행

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  const isProfit = profitLoss >= 0;
  const isWinner = profitLossPercent > 5; // Assume winner if >5% profit
  const isLoser = profitLossPercent < -2; // Assume loser if <-2% loss

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg border-white/20">
        <div className="text-center space-y-6">
          {/* Give Up Notice */}
          {isGaveUp && (
            <div className="bg-orange-500/20 border border-orange-400/40 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-300">
                <Flag className="w-5 h-5" />
                <span className="font-semibold">게임을 기권하셨습니다</span>
              </div>
              <p className="text-sm text-orange-200 mt-1">
                시간이 끝나기 전에 기권하여 현재까지의 결과를 확인하고 있습니다.
              </p>
            </div>
          )}

          {/* Result Icon */}
          <div className="flex justify-center">
            {isWinner ? (
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            ) : isLoser ? (
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Coffee className="w-12 h-12 text-white" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Result Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {isGaveUp 
                ? '🏃‍♂️ 기권 완료!' 
                : isWinner 
                ? '🎉 승리!' 
                : isLoser 
                ? '😅 아쉬워요!' 
                : '😐 무난해요!'
              }
            </h1>
            <p className="text-xl text-blue-200">
              {isGaveUp
                ? '현재까지의 거래 결과입니다!'
                : isWinner 
                ? '친구들에게 커피를 받으세요!'
                : isLoser 
                ? '친구들에게 커피를 사야겠네요...'
                : '다음엔 더 잘할 수 있을 거예요!'
              }
            </p>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-white/70">최종 자산</span>
              </div>
              <p className="text-2xl font-bold text-white">₩{formatPrice(finalValue)}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <span className="text-white/70">손익</span>
              </div>
              <p className={`text-2xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}₩{formatPrice(profitLoss)}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-white/70">수익률</span>
              </div>
              <p className={`text-2xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Trade Summary */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">거래 요약</h3>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-white/70">총 거래 횟수</p>
                <p className="text-xl font-bold text-white">{trades.length}번</p>
              </div>
              <div className="text-center">
                <p className="text-white/70">매수 거래</p>
                <p className="text-xl font-bold text-green-400">
                  {trades.filter(t => t.type === 'buy').length}번
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/70">매도 거래</p>
                <p className="text-xl font-bold text-red-400">
                  {trades.filter(t => t.type === 'sell').length}번
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onRestart}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              다시 도전하기
            </Button>
            
            <Button
              onClick={() => window.location.href = '/history'}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold py-3 text-lg"
            >
              게임 기록 보기
            </Button>
          </div>

          {/* Fun Message */}
          <p className="text-blue-200 text-sm">
            {isGaveUp 
              ? '다음엔 끝까지 도전해보세요! 💪'
              : '친구들과 함께 다시 한 번 도전해보세요!'
            }
            {!isGaveUp && isLoser && ' 이번엔 커피값을 아껴볼까요? ☕'}
            {!isGaveUp && isWinner && ' 연승 행진을 이어가보세요! 🏆'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GameResults;
