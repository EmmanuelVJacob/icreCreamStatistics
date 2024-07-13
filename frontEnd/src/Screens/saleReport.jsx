import React, { useEffect, useState } from "react";
import SalesChart from "../components/saleChar";
import { getSalesByMonth, getTotalSales } from "../services/productApi";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
const SalesReport = () => {
  const [salesData, setSalesData] = useState({});
  const [totalSales, setTotalSales] = useState(0);

  const [apiCall, setApiCall] = useState({
    loading: false,
    error: false,
  });

  const fetchSalesData = async () => {
    try {
      setApiCall({
        loading: true,
        error: false,
      });
      const tempData = await getSalesByMonth();
      setSalesData(tempData);
      setApiCall({
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error(error);
      setApiCall({
        loading: false,
        error: true,
      });
    }
  };

  const fetchTotalSales = async () => {
    try {
      setApiCall({
        loading: true,
        error: false,
      });
      const tempData = await getTotalSales();
      setTotalSales(tempData);
      setApiCall({
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error(error);
      setApiCall({
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchTotalSales();
  }, []);

  return (
    <>
      {apiCall.loading && !apiCall.error && <Loading />}
      {!apiCall.loading && !apiCall.error && (
        <div className="App flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 p-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold mb-6 text-gray-800">
              Monthly Sales Chart
            </h1>
            <SalesChart data={salesData} />
          </div>

          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-gray-200 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Monthly Sales Data</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Month</th>
                    <th className="py-2">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(salesData).map(([month, sales]) => (
                    <tr key={month} className="border-b">
                      <td className="py-2">{month}</td>
                      <td className="py-2">Rs.{sales.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-200 mt-4 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Total Sales</h2>
              <div className="text-xl font-bold text-center">
                Rs.{totalSales.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
      {!apiCall.loading && apiCall.error && <ErrorPage />}
    </>
  );
};

export default SalesReport;
