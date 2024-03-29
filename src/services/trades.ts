import { Trade } from "../models/trade";
import { ITrade } from "../interfaces";
import { Portfolio } from "../models/portfolio";

export const addTrade = async (tradeData: ITrade, portfolioId: string) => {
  if(!tradeData.price) {
    throw new Error('trade price is required field.');
  }

  if(!tradeData.type) {
    throw new Error('trade type is required field.');
  }

  if(!tradeData.name) {
    throw new Error('trade name is required field.');
  }

  if(!tradeData.quantity) {
    throw new Error('quantity is required field.');
  }

  if(!tradeData.stock) {
    throw new Error('stock id is required field.');
  }

  const trade = new Trade({
    name: tradeData.name,
    price: tradeData.price,
    type: tradeData.type,
    quantity: tradeData.quantity,
    stock: tradeData.stock,
  });
  await trade.save();

  // push this trade into portfolio
  // TODO: If User Model would be implemented then we can handle User and Portfolio with 1 to 1 relation
  // here we can receive portfolioId from client (it will be available in User schema);
  await Portfolio.findOneAndUpdate(
    { _id: portfolioId }, // provide portfolio id
    { 
        $push: { trade: trade._id },
        $addToSet: { stock: tradeData.stock }, // To prevent duplicate stock entry
    },
    {
      upsert: true, // This will create the Portfolio doc if not exist
    }
  )

  return trade;
};

export const getAllTrades = async () => {
  const trades = await Trade.find().lean();

  return trades;
};

export const getTradeById = async (tradeId: string) => {
  const trade = await Trade.findById(tradeId).lean();

  return trade;
};

export const updateTrade = async (tradeId: string, toBeUpdateTradeData: ITrade) => {
  const trade = await Trade.findOneAndUpdate(
    { _id: tradeId },
    toBeUpdateTradeData,
    {
      new: true,
    }
  )

  return trade;
};

export const deletTrade = async (tradeId: string) => {
  const trade = await Trade.findOneAndDelete({
    _id: tradeId,
  });

  if(!trade) {
    throw new Error('trade not found.')
  }

  return trade;
}