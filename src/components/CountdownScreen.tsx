
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface CountdownScreenProps {
  countdown: number;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ countdown }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg border-white/20">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">게임 시작 준비</h1>
            <p className="text-blue-200">잠시 후 게임이 시작됩니다</p>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-6xl font-bold text-white">{countdown}</span>
            </div>
            
            <div className="text-white/70 text-lg">
              {countdown === 3 && "준비하세요! 🚀"}
              {countdown === 2 && "거의 다 됐어요! ⚡"}
              {countdown === 1 && "시작합니다! 🎯"}
            </div>
          </div>

          <div className="space-y-2 text-sm text-blue-200">
            <p>💡 팁: 시장 상황을 빠르게 파악하고</p>
            <p>📈 수익률을 극대화해보세요!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CountdownScreen;
