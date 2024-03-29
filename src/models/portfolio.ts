import { Schema, Types, model } from "mongoose";
import { IPortfolio } from "../interfaces";
const portfolioSchema = new Schema({
  stock: [{ type: Types.ObjectId, ref: 'Stock' }], // We can easily query all the stocks in a user portfolio
  trade: [{ type: Types.ObjectId, ref: 'Trade' }], // 1(Portfolio):Many(Trade) relationship
  // Easily query all the trade of a user's portfolio
  // we can directly store the whole object, in that case we won't required any JOIN but there can be a case when trade data will be edited
});

const Portfolio = model<IPortfolio>('Portfolio', portfolioSchema);

export { Portfolio };