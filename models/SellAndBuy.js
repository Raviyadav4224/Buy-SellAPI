import mongoose from "mongoose";

const sellBuySchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    costPrice:{
        type:Number,
        required:true
    },
    sellPrice:{
        type:Number,
    }
})

export const sellbuys=mongoose.model('sellbuys',sellBuySchema)