import React, { useEffect, useState } from "react";
import { getRevenuePerMonth } from "../services/productApi";
import RevenueBarChart from "../components/revenueChart";
import ErrorPage from "../components/error";
import Loading from "../components/loading";
const RevenuePerMonth = () => {
  const [mostRevenueItem, setMostRevenueItems] = useState([]);

  const [apiCall, setApiCall] = useState({
    loading: false,
    error: false,
  });

  const fetchPopularItem = async () => {
    try {
      setApiCall({
        loading: true,
        error: false,
      });
      const { itemRevenueByMonth } = await getRevenuePerMonth(); 
      console.log(itemRevenueByMonth, "this is the itemRevenueByMonth");

      const MonstRevenueItems = Object.keys(itemRevenueByMonth).map(
        (month) => ({
          month,
          item: itemRevenueByMonth[month].topItem,
          quantity: itemRevenueByMonth[month].maxRevenue,
        })
      );
      setMostRevenueItems(MonstRevenueItems);
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
    fetchPopularItem();
  }, []);

  return (
    <>
      {apiCall.loading && !apiCall.error && <Loading />}
      {!apiCall.loading && !apiCall.error && (
        <div className="App flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 p-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold mb-6 text-gray-800">
              Monthly Most Revenue Items Chart
            </h1>
            <RevenueBarChart data={mostRevenueItem} />
          </div>

          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-gray-200 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">
                Monthly Most Revenue Items
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Month</th>
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {mostRevenueItem.map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{entry.month}</td>
                      <td className="py-2">{entry.item}</td>
                      <td className="py-2">
                        {entry.quantity.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {!apiCall.loading && apiCall.error && <ErrorPage />}
    </>
  );
};

export default RevenuePerMonth;
