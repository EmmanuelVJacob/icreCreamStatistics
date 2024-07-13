import { api } from "../utils/axios";

const getAllData = async (page) => {
  try {
    let body = { page };
    const res = await api.post("/getAllData", body);
    return res?.data;
  } catch (error) {
    console.error("something went ");
    throw error;
  }
};

const getSalesByMonth = async () => {
  try {
    const res = await api.get("/getMonthSales");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
const getPopularItem = async () => {
  try {
    const res = await api.get("/getMostPopularItem");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
const getMostPopularItemStati = async () => {
  try {
    const res = await api.get("/getMostPopularItemStatistics");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};
const getRevenuePerMonth = async () => {
  try {
    const res = await api.get("/getTopItemsPerMonth");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};

const getTotalSales = async () => {
  try {
    const res = await api.get("/getTotalSales");
    return res?.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllData,
  getSalesByMonth,
  getTotalSales,
  getPopularItem,
  getRevenuePerMonth,
  getMostPopularItemStati,
};
