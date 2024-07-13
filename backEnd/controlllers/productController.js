import { getDataFromFile } from "./getData.js";

const data = await getDataFromFile();

const getData = async (req, res) => {
  try {
  
    let page = parseInt(req.body.page); 
    const pageSize = 10; 

    if (!page || page < 1) {
      page = 1;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return res.json(paginatedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const calculateTotalSales = async (req, res) => {
  try {

    let totalSales = 0;

    data.forEach((record) => {
      totalSales += record["Total Price"];
    });

    return res.json(totalSales);
  } catch (err) {
    console.error("Error calculating total sales:", err);
    throw err;
  }
};

const calculateTotalSalesByMonth = async (req, res) => {
  try {
  

    const monthlySales = {};

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    data.forEach((record) => {
      const date = new Date(record.Date);
      const monthName = monthNames[date.getMonth()];

      if (!monthlySales[monthName]) {
        monthlySales[monthName] = 0;
      }

      monthlySales[monthName] += record["Total Price"];
    });

    if (Object.keys(monthlySales).length === 0) {
      return res.json("No sales happened");
    }
    return res.json(monthlySales);
  } catch (err) {
    console.error("Error calculating monthly sales:", err);
    throw err;
  }
};

const findMostPopularItemByMonth = async (req, res) => {
  try {

    const monthlyPopularItems = data.reduce((acc, record) => {
      const date = new Date(record.Date);
      const month = date.getMonth() + 1; 

      if (!acc[month]) {
        acc[month] = { item: "", quantity: 0 };
      }

      if (record.Quantity > acc[month].quantity) {
        acc[month] = {
          item: record.SKU,
          quantity: record.Quantity,
        };
      }

      return acc;
    }, {});

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const result = Object.keys(monthlyPopularItems).map((month) => ({
      month: monthNames[month - 1],
      item: monthlyPopularItems[month].item,
      quantity: monthlyPopularItems[month].quantity,
    }));

    if (result.length === 0) {
      return res.json("No sales happened");
    }

    return res.json(result);
  } catch (err) {
    console.error("Error finding most popular item by month:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const calculateTopItemsPerMonth = async (req, res) => {
  try {
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const itemRevenueByMonth = {};

    data.forEach((record) => {
      const date = new Date(record.Date);
      const monthName = monthNames[date.getMonth()]; 

      if (!itemRevenueByMonth[monthName]) {
        itemRevenueByMonth[monthName] = {
          topItem: "",
          maxRevenue: 0,
        };
      }

      if (!itemRevenueByMonth[monthName][record.SKU]) {
        itemRevenueByMonth[monthName][record.SKU] = 0;
      }

      itemRevenueByMonth[monthName][record.SKU] += record["Total Price"];

      if (
        itemRevenueByMonth[monthName][record.SKU] >
        itemRevenueByMonth[monthName].maxRevenue
      ) {
        itemRevenueByMonth[monthName].topItem = record.SKU;
        itemRevenueByMonth[monthName].maxRevenue =
          itemRevenueByMonth[monthName][record.SKU];
      }
    });

    const result = {
      itemRevenueByMonth,
    };

    return res.json(result);
  } catch (err) {
    console.error("Error calculating top items by month:", err);
    throw err;
  }
};

const findMostPopularItemStatisticsByMonth = async (req, res) => {
  try {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const itemTotalQuantity = {};

    data.forEach((record) => {
      if (!itemTotalQuantity[record.SKU]) {
        itemTotalQuantity[record.SKU] = 0;
      }
      itemTotalQuantity[record.SKU] += record.Quantity;
    });

    const mostPopularItem = Object.keys(itemTotalQuantity).reduce(
      (maxItem, currentItem) =>
        itemTotalQuantity[currentItem] > itemTotalQuantity[maxItem]
          ? currentItem
          : maxItem
    );

    const orderStatsByMonth = {};

    data.forEach((record) => {
      if (record.SKU === mostPopularItem) {
        const date = new Date(record.Date);
        const month = date.getMonth(); 

        if (!orderStatsByMonth[month]) {
          orderStatsByMonth[month] = {
            minOrders: Number.MAX_SAFE_INTEGER,
            maxOrders: Number.MIN_SAFE_INTEGER,
            totalOrders: 0,
            orderCount: 0,
          };
        }

        if (record.Quantity < orderStatsByMonth[month].minOrders) {
          orderStatsByMonth[month].minOrders = record.Quantity;
        }
        if (record.Quantity > orderStatsByMonth[month].maxOrders) {
          orderStatsByMonth[month].maxOrders = record.Quantity;
        }

        orderStatsByMonth[month].totalOrders += record.Quantity;
        orderStatsByMonth[month].orderCount += 1;
      }
    });

    Object.keys(orderStatsByMonth).forEach((month) => {
      orderStatsByMonth[month].averageOrders =
        orderStatsByMonth[month].totalOrders /
        orderStatsByMonth[month].orderCount;
    });

    const result = Object.keys(orderStatsByMonth).map((month) => ({
      month: monthNames[month],
      minOrders: orderStatsByMonth[month].minOrders,
      maxOrders: orderStatsByMonth[month].maxOrders,
      averageOrders: orderStatsByMonth[month].averageOrders.toFixed(2),
    }));

    if (result.length === 0) {
      return res.json("No sales happened");
    }

    return res.json({
      mostPopularItem,
      statistics: result,
    });
  } catch (err) {
    console.error("Error calculating order statistics by month:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getData,
  calculateTotalSales,
  calculateTotalSalesByMonth,
  findMostPopularItemByMonth,
  calculateTopItemsPerMonth,
  findMostPopularItemStatisticsByMonth,
};
