
import React from 'react';
import { Card } from '@/components/ui/card';

interface CountdownScreenProps {
  countdown: number;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ countdown }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border-white/20">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">게임 시작</h1>
            <p className="text-blue-200">준비하세요!</p>
          </div>

          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-4xl font-bold text-white">{countdown}</span>
          </div>
          
          <div className="text-white/70 text-lg">
            {countdown === 3 && "차트를 확인하세요! 🚀"}
            {countdown === 2 && "거래 준비! ⚡"}
            {countdown === 1 && "시작! 🎯"}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CountdownScreen;
