
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

export const TIME_OPTIONS = [
  { value: 60, label: '1분', description: '빠른 승부' },
  { value: 120, label: '2분', description: '기본 모드' },
  { value: 180, label: '3분', description: '여유있게' },
  { value: 300, label: '5분', description: '심화 모드' }
];

export const INITIAL_CAPITAL_OPTIONS = [
  { value: 10000, label: '10,000원', description: '기본 모드' },
  { value: 50000, label: '50,000원', description: '넉넉하게' },
  { value: 100000, label: '100,000원', description: '큰 손' },
  { value: 0, label: '직접 입력', description: '원하는 금액' }
];

export const INITIAL_COINS: CoinData[] = [
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
];

export const createInitialPortfolio = (initialCapital: number): Portfolio => ({
  cash: initialCapital,
  holdings: { BTC: 0, ETH: 0, DOGE: 0 },
  trades: []
});
