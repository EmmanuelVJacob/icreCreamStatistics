import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { productRoutes } from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/iceCream", productRoutes); 
const port = process.env.PORT || 5000;
app.listen(port, console.log(`server running in port : ${port}`));
