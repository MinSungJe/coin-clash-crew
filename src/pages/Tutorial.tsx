
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, DollarSign, Clock, Target, Zap, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorial = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              게임으로 돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">코인 배틀 튜토리얼</h1>
            <p className="text-blue-200">게임 방법을 익혀보세요!</p>
          </div>
        </div>

        {/* Game Overview */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">게임 목표</h2>
          </div>
          <div className="text-blue-100 space-y-2">
            <p>• 주어진 시간 내에 코인 거래로 <strong className="text-white">최대한 많은 수익</strong>을 만드세요</p>
            <p>• 초기 자본을 기준으로 <strong className="text-white">수익률</strong>이 가장 높은 사람이 승리합니다</p>
            <p>• 친구들과 함께 실시간으로 경쟁하며 투자 실력을 겨뤄보세요</p>
          </div>
        </Card>

        {/* Basic Concepts */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">기본 개념</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💰 코인이란?</h3>
                <p className="text-blue-100 text-sm">
                  디지털 화폐입니다. 비트코인(BTC), 이더리움(ETH), 도지코인(DOGE) 등이 있어요.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📈 매수 (구매)</h3>
                <p className="text-blue-100 text-sm">
                  코인을 사는 것입니다. 가격이 오를 것 같으면 매수하세요.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📉 매도 (판매)</h3>
                <p className="text-blue-100 text-sm">
                  보유한 코인을 파는 것입니다. 수익을 확정하거나 손실을 줄일 때 사용해요.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💹 수익률</h3>
                <p className="text-blue-100 text-sm">
                  초기 자본 대비 얼마나 돈을 벌었는지 나타내는 비율입니다.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Game Flow */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">게임 진행 방법</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-white">게임 설정</h3>
                <p className="text-blue-100 text-sm">초기 자본과 게임 시간을 선택하고 게임을 시작합니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-white">코인 선택</h3>
                <p className="text-blue-100 text-sm">차트에서 원하는 코인을 클릭하여 선택합니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-white">거래하기</h3>
                <p className="text-blue-100 text-sm">우측 거래 패널에서 매수/매도 버튼을 눌러 거래합니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-white">결과 확인</h3>
                <p className="text-blue-100 text-sm">시간이 끝나면 최종 수익률을 확인하고 순위를 비교합니다.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Screen Guide */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">화면 구성 안내</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">🕐 상단 헤더</h3>
                <p className="text-blue-100 text-sm">남은 시간을 확인할 수 있습니다.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💼 포트폴리오</h3>
                <p className="text-blue-100 text-sm">현재 보유 현금, 코인, 총 자산, 수익률을 확인할 수 있습니다.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📊 차트</h3>
                <p className="text-blue-100 text-sm">코인별 실시간 가격 변동을 확인할 수 있습니다.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">💱 거래 패널</h3>
                <p className="text-blue-100 text-sm">선택한 코인을 매수/매도할 수 있습니다.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">📋 거래 기록</h3>
                <p className="text-blue-100 text-sm">지금까지 진행한 모든 거래 내역을 확인할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">게임 팁</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">차트를 자주 확인하여 가격 변동을 파악하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">한 코인에만 투자하지 말고 분산 투자를 고려해보세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">수량 기준과 금액 기준 거래를 상황에 맞게 사용하세요</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">손실이 날 때 과도한 거래는 피하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">시간이 제한되어 있으니 신중하게 거래하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-blue-100 text-sm">게임이니까 부담 갖지 말고 재미있게 즐기세요!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-8 text-lg">
              이제 게임을 시작해보세요!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
