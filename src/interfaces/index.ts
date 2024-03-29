export interface IStock {
  name: string;
}

export interface ITrade {
  name: string;
  price: number;
  type: 'BUY' | 'SELL';
  quantity: number;
  _id: string;
  stock: string;
}

export interface IPortfolio {
  stock: Array<string>;
  trade: Array<ITrade>;
}