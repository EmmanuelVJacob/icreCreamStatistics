import React, { useEffect, useState } from "react";
import Card from "../components/cards";
import Pagination from "../components/pagination";
import { getAllData } from "../services/productApi";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
const GetAllData = () => {
  const ITEMS_PER_PAGE = 10;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const [apiCall, setApiCall] = useState({
    loading: false,
    error: false,
  });

  const fetchAllData = async () => {
   try {
    setApiCall({
      loading: true,
      error: false,
    });
    const tempData = await getAllData(currentPage);
    setData(tempData);
    setApiCall({
      loading: false,
      error: false,
    });
   } catch (error) {
    console.error(error)
    setApiCall({
      loading: false,
      error: true,
    });
   }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentPage]);

  return (
    <>
      {apiCall.loading && !apiCall.error && <Loading />}
      {!apiCall.loading && !apiCall.error && (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl md:text-4xl text-center font-bold mb-6 text-gray-800">
            All Products
          </h1>

          {data.length !== 0 ? (
            data.map((item, index) => (
              <div key={index} className="p-5">
                <Card item={item} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 mt-4">
              No data available
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      {!apiCall.loading && apiCall.error && <ErrorPage />}
    </>
  );
};

export default GetAllData;
