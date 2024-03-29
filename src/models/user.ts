import { Schema, Types, model } from "mongoose";

// TODO: complete its implementation
const userSchema = new Schema({
  username: String,
  portfolio: { type: Types.ObjectId, ref: 'Portfolio' },
  // 1 to 1 with portfolio
  // why seperate schema for portfolio? Because --
  // 1. portfolio can be updated alot (means buying or selling)
  // 2. portfolio will be query on its own quite frequently.
});

const User = model('User', userSchema);

export { User };