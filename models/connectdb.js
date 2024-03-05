import mongoose from "mongoose";
const connectdb=async()=>{
   mongoose.set('strictQuery', true)
   const {connection}= await mongoose.connect('mongodb+srv://ravi:netflix@cluster0.cbscdna.mongodb.net/sellBuyAPI?retryWrites=true&w=majority')
   console.log(`mongoose connected at ${connection.host}`);
}

export default connectdb