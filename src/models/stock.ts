import { Schema, model } from "mongoose";

const stockSchema = new Schema({
  name: { type: String, trim: true },
});

const Stock = model('Stock', stockSchema);

export { Stock };