import { ITrade } from "../interfaces";
import { Portfolio } from "../models/portfolio";
import { Trade } from "../models/trade";

export const getPortfolio = async () => {
  const portfolio = await Portfolio.aggregate([
    {
      $lookup: {
        from: 'trades',
        as: 'trades',
        localField: 'trade',
        foreignField: '_id',
      }
    },
    {
      $unwind: '$trades',
    },
    {
      $group: {
        _id: '$trades.name',
        trade: {
          $push: {
            type: '$trades.type',
            quantity: '$trades.quantity',
            price: '$trades.price',
            orderDate: '$trades.createdAt'
          }
        }
      }
    },
    {
      $project: {
        trade: 1,
        stock: '$_id',
        _id: 0,
      }
    }
  ])

  return portfolio;
}

export const getHoldings = async () => {
  // TODO: need to include totalStock
  const avgBuying = await Portfolio.aggregate([
    {
      $lookup: {
        from: 'trades',
        as: 'trades',
        localField: 'trade',
        foreignField: '_id',
      }
    },
    {
      $unwind: '$trades',
    },
    {
      $group: {
        _id: {
          name: '$trades.name' 
        },
        totalItems: { $sum: { $cond: [{ $eq: ['$trades.type', 'BUY']}, '$trades.quantity', { $multiply: ['$trades.quantity', -1]}]} },
        buyingPrice: { $sum: { $cond: [{ $eq: ['$trades.type', 'BUY']}, '$trades.price', 0]}},
        totalBuyItem: { $sum: { $cond: [{ $eq: ['$trades.type', 'BUY']}, 1, 0]}}
      }
    },
    {
      $project: {
        _id: 0,
        stock: '$_id.name',
        avgBuyingPrice: { $divide: ['$buyingPrice', '$totalBuyItem']},
        totalItems: 1,
      }
    }
  ])

  return avgBuying;
}

export const getReturns = async () => {
  // initial price is buying price.
  // final price is 100
  const finalPrice: number = 100;

  const portfolio = await Portfolio.find().populate('trade');
  const trades = portfolio[0].trade;
  let cummulativeReturns: number = 0;

  for(let i = 0; i < trades.length; i += 1) {
    if(trades[i].type === 'SELL') {
      cummulativeReturns -= trades[i].price;
    } else {
      cummulativeReturns += (trades[i].quantity * finalPrice) - trades[i].price;
    }
  }

  return cummulativeReturns;
}

export const addPortfolio = async () => {
  const portfolio = new Portfolio({});
  await portfolio.save();

  return portfolio; // use its id for trade
}