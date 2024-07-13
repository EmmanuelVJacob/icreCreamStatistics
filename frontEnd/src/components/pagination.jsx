import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage, totalItems, pageSize }) => {
  totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap justify-center items-center mt-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 my-1 disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 md:px-4 md:py-2 my-1 mx-1 rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="px-3 py-1 md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 my-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
