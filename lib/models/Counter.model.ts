// models/counter.model.ts
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 5000 },
});

export default mongoose.models.Counter ||
  mongoose.model("Counter", CounterSchema);
