import express from "express";
import {
  getData,
  calculateTotalSales,
  calculateTotalSalesByMonth,
  findMostPopularItemByMonth,
  calculateTopItemsPerMonth,
  findMostPopularItemStatisticsByMonth,
} from "../controlllers/productController.js";

export const productRoutes = express.Router();

productRoutes.post("/getAllData", getData);
productRoutes.get("/getTotalSales", calculateTotalSales);
productRoutes.get("/getMonthSales", calculateTotalSalesByMonth);
productRoutes.get("/getMostPopularItem", findMostPopularItemByMonth);
productRoutes.get("/getTopItemsPerMonth", calculateTopItemsPerMonth);
productRoutes.get("/getMostPopularItemStatistics", findMostPopularItemStatisticsByMonth);
