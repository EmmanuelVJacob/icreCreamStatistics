import React from "react";

const Card = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <h2 className="text-lg md:text-xl font-semibold">{item.SKU}</h2>
      <p className="text-sm md:text-base">
        <strong>Date:</strong> {item.Date}
      </p>
      <p className="text-sm md:text-base">
        <strong>Unit Price:</strong> {item["Unit Price"]}
      </p>
      <p className="text-sm md:text-base">
        <strong>Quantity:</strong> {item.Quantity}
      </p>
      <p className="text-sm md:text-base">
        <strong>Total Price:</strong> {item["Total Price"]}
      </p>
    </div>
  );
};

export default Card;
