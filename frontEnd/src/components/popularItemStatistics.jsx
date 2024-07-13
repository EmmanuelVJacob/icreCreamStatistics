import React from "react";

const PopularItemStatistics = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-6 text-gray-800">
        Overall Most Popular Item: <span className="text-red-500"> {data.mostPopularItem}</span>
      </h1>
      <div className="overflow-x-auto">
        <div className="shadow-md overflow-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Month
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Min Orders
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Max Orders
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Average Orders
                </th>
              </tr>
            </thead>
            <tbody>
              {data.statistics.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-6 border-b border-gray-200">
                    {entry.month}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {entry.minOrders}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {entry.maxOrders}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {entry.averageOrders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopularItemStatistics;
