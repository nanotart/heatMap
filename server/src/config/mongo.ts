import mongoose from "mongoose";
export default function mongoConnection() {
  mongoose.connect(process.env.MONGODB_URI || "", () => {
    console.log("MongoDB connected");
  });
}
