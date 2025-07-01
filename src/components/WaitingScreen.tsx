
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TrendingUp, Users, Trophy, Coffee, Clock } from 'lucide-react';
import { TIME_OPTIONS } from '@/types/GameTypes';

interface WaitingScreenProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  onStartGame: () => void;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({
  selectedDuration,
  onDurationChange,
  onStartGame
}) => {
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
              onValueChange={(value) => onDurationChange(parseInt(value))}
              className="grid grid-cols-2 gap-3"
            >
              {TIME_OPTIONS.map((option) => (
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
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
          >
            {TIME_OPTIONS.find(opt => opt.value === selectedDuration)?.label} 게임 시작하기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WaitingScreen;
