import { Schema, Types, model } from "mongoose";
import { ITrade } from "../interfaces";

enum ActionType {
  BUY = 'BUY',
  SELL = 'SELL'
}
const actionType = ['BUY', 'SELL']

const tradeSchema = new Schema({
  name: { type: String, trim: true },
  price: Number,
  quantity: Number,
  type: {
    type: String,
    enum: actionType,
    default: ActionType.BUY
  },
  stock: { type: Types.ObjectId, ref: 'Stock' }, // parent reference
  // Many to 1, because many trades can belongs to 1 stock, but one trade cannot belong to multiple stock
  // Read/write ration will be high for Trade and also it can be edited or queries on its own
}, {
  timestamps: true,
});

const Trade = model<ITrade>('Trade', tradeSchema);

export { Trade };