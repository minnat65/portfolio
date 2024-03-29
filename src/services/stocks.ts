import { Stock } from "../models/stock";
import { IStock } from "../interfaces";

export const addStock = async (stockData: IStock) => {
  if(!stockData.name) {
    throw new Error('Stock price is required field.');
  }

  const stock = new Stock({
    name: stockData.name,
  });
  await stock.save();

  return stock;
}

export const getAllStocks = async () => {
  const stocks = await Stock.find({});

  return stocks;
}