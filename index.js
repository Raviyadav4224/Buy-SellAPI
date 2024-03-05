import express from "express";
import connectdb from "./models/connectdb.js";
import { sellbuys } from "./models/SellAndBuy.js";
const app = express();
app.use(express.json());
const PORT = 8000;
connectdb();
app.get("/sellProduct", async (req, res) => {
  try {
    const product = req.query.product;
    let sortByValue = req.query.sortBy;
    let sortBy={}
    if (sortByValue === "lowerCostPrice") {
      sortBy = { costPrice: 1 };
    } else if (sortByValue === "higherCostPrice") {
      sortBy = { costPrice: -1 };
    } else if (sortByValue === "lowerSoldPrice") {
      sortBy = { sellPrice: 1 };
    } else if (sortByValue === "higherSoldPrice") {
      sortBy = { sellPrice: -1 };
    }
    if (!product && !sortByValue) {
      const data = await sellbuys.find();
      return res.status(200).json(data);
    }    else if (!product) {
        const data = await sellbuys.find().sort(sortBy);
        return res.status(200).json(data);
      } 
    else {
      const data = await sellbuys.find({ productName: product }).sort(sortBy);
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
app.post("/sellProduct", async (req, res) => {
  try {
    if (req.body.productName.length < 4) {
      return res.status(400).json({
        message: "product name should have minimum of four characters",
      });
    } else if (req.body.costPrice <= 0) {
      return res.status(400).json({
        message: "cost price value cannot be zero or negative value",
      });
    }
    const data = await sellbuys.create(req.body);
    await data.save();
    res.status(201).json({
      message: "Product Added",
    });
  } catch (error) {
    res.status(400).send();
  }
});
app.patch('/sellProduct/:id',async(req,res)=>{
    try {
	const _id=req.params.id
	    if(req.body.sellPrice<=0){
	        return res.status(400).json({
	            message:"sold price value cannot be zero or negative value"
	        })
	    }
	    const data =await sellbuys.findById(_id)
	    if(!data){
	        return res.status(400).json({
	            message:"Invalid id"
	        })
	    }
	    data.sellPrice=req.body.sellPrice
	    await data.save()
	    res.status(200).json({
	        message:"Updated Successfully"
	    })
} catch (error) {
	res.status(400).json({
        error:error.message
    })
}
})

app.delete('/sellProduct/:id',async(req,res)=>{
    const data=await sellbuys.findById(req.params.id)
    if(!data){
        return res.status(400).json({
            message:"Invalid id"
        })
    }
    await data.remove()
    res.status(200).json({
        message:"Deleted Successfully"
    })
})
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
