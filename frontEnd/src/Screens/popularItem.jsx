import React, { useEffect, useState } from "react";
import {
  getMostPopularItemStati,
  getPopularItem,
} from "../services/productApi";
import BarChart from "../components/barChart2";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import PopularItemStatistics from "../components/popularItemStatistics";

const PopularItem = () => {
  const [popularItems, setPopularItem] = useState([]);
  const [MostPopularItem, setMostPopularItem] = useState({});
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
      const tempData = await getPopularItem();
      setPopularItem(tempData);
      setApiCall({
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Error fetching popular items:", error);
      setApiCall({
        loading: false,
        error: true,
      });
    }
  };

  const fetchMostPopularItemStat = async () => {
    try {
      setApiCall({
        loading: true,
        error: false,
      });
      const tempData = await getMostPopularItemStati();
      setMostPopularItem(tempData);
      setApiCall({
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Error fetching popular items:", error);
      setApiCall({
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchPopularItem();
    fetchMostPopularItemStat()
  }, []);

  return (
    <>
      {apiCall.loading && !apiCall.error && <Loading />}
      {!apiCall.loading && !apiCall.error && (
        <div className="App flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 p-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold mb-6 text-gray-800">
              Monthly Popular Items Chart
            </h1>
            <BarChart data={popularItems} />
          </div>

          <div className="w-full lg:w-1/3 p-4">
            <div className="bg-gray-200 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Monthly Popular Items</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Month</th>
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((entry, index) => (
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
        { Object.keys(MostPopularItem).length !== 0 &&     <PopularItemStatistics data={MostPopularItem} />}
          </div>
        </div>
      )}
      {!apiCall.loading && apiCall.error && <ErrorPage />}
    </>
  );
};

export default PopularItem;
