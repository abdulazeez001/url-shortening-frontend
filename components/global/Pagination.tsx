import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3.5 py-1 mx-1 font-medium ${
            currentPage === i ? "bg-[#DBE8FF] text-primary rounded-lg" : "text-bodytext"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center border-x border-b border-[#EAECF0] p-3 rounded-b-lg ">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center border border-[#D0D5DD] py-2 px-3 rounded-lg text-sm font-medium text-[#344054]"
      >
        {" "}
        <span className="mr-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8333 6.99999H1.16663M1.16663 6.99999L6.99996 12.8333M1.16663 6.99999L6.99996 1.16666"
              stroke="#344054"
              stroke-width="1.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        Previous
      </button>
      <div className="flex space-x-2">{renderPageNumbers()}</div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center border border-[#D0D5DD] py-2 px-3 rounded-lg text-sm font-medium text-[#344054]"
      >
        Next{" "}
        <span className="ml-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16675 6.99999H12.8334M12.8334 6.99999L7.00008 1.16666M12.8334 6.99999L7.00008 12.8333"
              stroke="#344054"
              stroke-width="1.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Pagination;
